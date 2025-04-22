import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivityLogModel } from 'src/app/core/activity-log/model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivityLogData } from './data';
import { AddActivityLogComponent } from '../add-activity-log/add-activity-log.component';
import { ActivityLogService } from 'src/app/core/activity-log/activity-log.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-activity-log-list',
  templateUrl: './activity-log-list.component.html',
  styleUrls: ['./activity-log-list.component.scss']
})
export class ActivityLogListComponent implements OnInit {
  searchTerm = '';
  totalSize: any = 0;
  breadCrumbItems: Array<{}>;
  loading = false;
  tableData: any = [];
  page = 1;
  pageSize = 5;
  todaysDate = new Date();
  total$: Observable<number>;
  previousPage: any = 0;
  sizeOptions: Array<any> = [
    { name: '5', value: 5 },
    { name: '10', value: 10 },
    { name: '25', value: 25 }
  ];
  roleName: any;
  constructor(
    private modalService: NgbModal,
    private logService: ActivityLogService,
    private cdr: ChangeDetectorRef,
    private authenticationService: AuthenticationService,
    private datepipe: DatePipe
  ) {}

  ngOnInit() {
    this.roleName = sessionStorage.getItem('role');
    this.breadCrumbItems = [
      { label: 'Quatreo', path: '/' },
      { label: 'Activity Log', path: '/', active: true }
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
      sort: 'activityDate',
      page: Number(this.page) - 1,
      queryString: this.datepipe.transform(this.todaysDate, 'yyyy-MM-dd'),
      userId:
        sessionStorage.getItem('role') !== 'Admin'
          ? sessionStorage.getItem('uid')
          : ''
    };
    this.logService.getActivityLogs(querparams).subscribe(
      response => {
        const res = 'data';
        if (response[res]) {
          this.tableData = response[res].content;
          this.totalSize = response[res].totalElements;
          this.cdr.detectChanges();
        }
        this.loading = false;
      },
      err => {
        console.log(err, 'error');
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(this._fetchData.bind(this));
        }

        this.loading = false;
      }
    );
  }

  openModal() {
    // const addovertime = new OverTimeModel();
    // addovertime.clear()
    this.editUserdata();
  }
  // add over time
  editUserdata() {
    const modalref = this.modalService.open(AddActivityLogComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
      keyboard: false
    });
    modalref.componentInstance.passEntry.subscribe(receivedEntry => {
      this._fetchData();
    });
  }

  // Fetch data according to page number
  loadPage(page: number) {
    console.log(this.page, this.pageSize);
    if (page !== this.previousPage) {
      this.previousPage = page;
      this._fetchData();
    }
  }
  // Number of rows is listing can be changed
  changePagesize() {
    console.log('amit');
    this.pageSize = Number(this.pageSize);
    this.page = 1;
    this._fetchData();
  }
}
