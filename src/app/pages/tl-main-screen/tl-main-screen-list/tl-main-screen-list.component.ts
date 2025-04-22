import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TLData } from './data';
import { TlFilterScreenComponent } from '../tl-filter-screen/tl-filter-screen.component';


@Component({
  selector: 'app-tl-main-screen-list',
  templateUrl: './tl-main-screen-list.component.html',
  styleUrls: ['./tl-main-screen-list.component.scss']
})
export class TlMainScreenListComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  tableData: any[];
  selectClient: string[];
  page = 1;
  pageSize = 5;
  sizeOptions: Array<any> = [
    { name: '5', value: 5 },
    { name: '10', value: 10 },
    { name: '25', value: 25 }
  ];

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Quatreo', path: '/' }, { label: 'TL Main Screen', path: '/', active: true }];
    // fetch data
    this._fetchData();
    this.selectClient = ['James', 'Carol', 'Pearl'];
  }

  // fetch table value
  _fetchData() {
    this.tableData = TLData ;
    console.log(TLData);
  }

  // filter
  filterUserdata() {
    // console.log(data)
    const modalref = this.modalService.open(TlFilterScreenComponent, { centered: true, size : 'lg', backdrop: 'static', keyboard: false });
    // modalref.componentInstance.userdata = data;
    // modalref.componentInstance.action = action;
    // modalref.componentInstance.passEntry.subscribe((receivedEntry) => {
    //   console.log(receivedEntry);
    // })
  }

}
