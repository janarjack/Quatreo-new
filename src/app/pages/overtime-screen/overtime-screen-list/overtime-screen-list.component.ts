import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OverTimeModel } from 'src/app/core/overtime-screen/model';
import { overTimeData } from './data';
import { AddOvertimeComponent } from '../add-overtime/add-overtime.component';
import { OvertimeScreenService } from 'src/app/core/overtime-screen/overtime-screen.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-overtime-screen-list',
  templateUrl: './overtime-screen-list.component.html',
  styleUrls: ['./overtime-screen-list.component.scss']
})
export class OvertimeScreenListComponent implements OnInit {
  loading = false;

  page = 1;
  pageSize = 5;
  totalSize: any = 0;
  searchTerm = '';
  userData;

  breadCrumbItems: Array<{}>;
  sizeOptions: Array<any> = [
    { name: '5', value: 5 },
    { name: '10', value: 10 },
    { name: '25', value: 25 }
  ];
  todaysDate = new Date();
  tableData: any[];
  roleName: any;
  // tables$: Observable<OverTimeModel[]>;
  total$: Observable<number>;
  constructor(
    private modalService: NgbModal,
    private OvertimeService: OvertimeScreenService,
    private authenticationService: AuthenticationService,
    private cdr: ChangeDetectorRef,
    private datepipe: DatePipe
  ) {}

  ngOnInit() {
    this.roleName = sessionStorage.getItem('role');
    this.breadCrumbItems = [
      { label: 'Quatreo', path: '/' },
      { label: 'Overtime Screen', path: '/', active: true }
    ];

    // fetch data
    this._fetchData();
  }

  // fetch table value
  _fetchData() {
    this.loading = true;
    const querparams = {
      size: this.pageSize,
      order: 'DESCENDING',
      sort: 'otLogDate',
      page: Number(this.page) - 1,
      queryString: this.datepipe.transform(this.todaysDate, 'yyyy-MM-dd')
    };
    this.OvertimeService.getOTLogByUser(querparams).subscribe(
      response1 => {
        const res = 'data';
        if (response1[res]) {
          this.tableData = response1[res].content;
          console.log(this.tableData, 'tss');
          this.totalSize = response1[res].totalElements;
          this.cdr.detectChanges();
        }
        this.loading = false;
      },
      err => {
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(this._fetchData.bind(this));
        }
        this.loading = false;
      }
    );
  }

  openModal() {
    const addovertime = new OverTimeModel();
    addovertime.clear();
    this.editOTdata(addovertime, 'Add');
  }

  // add over time
  editOTdata(data, action) {
    const modalref = this.modalService.open(AddOvertimeComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
      keyboard: false
    });
    modalref.componentInstance.OTdata = data;
    modalref.componentInstance.action = action;
    modalref.componentInstance.passEntry.subscribe(receivedEntry => {
      // console.log(receivedEntry);
      this._fetchData();
    });
  }

  // Number of rows is listing can be changed
  changePagesize() {
    this.pageSize = Number(this.pageSize);
    this.page = 1;
    this._fetchData();
  }
}
