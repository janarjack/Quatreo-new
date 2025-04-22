import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { WeblinksModel } from 'src/app/core/weblinks/model';
import { AddWeblinksComponent } from '../add-weblinks/add-weblinks.component';
import { WeblinksService } from 'src/app/core/weblinks/weblinks.service';

@Component({
  selector: 'app-weblinks-mapping',
  templateUrl: './weblinks-mapping.component.html',
  styleUrls: ['./weblinks-mapping.component.scss']
})
export class WeblinksMappingComponent implements OnInit {

  loading = false;

  breadCrumbItems: Array<{}>;

  tableData: any[];
  county = [];

  state = [];
  stateId;
  countyId;
  selectedCounty: any;

  // tables$: Observable<ManageUserModel[]>;
  // total$: Observable<number>;

  // searchTerm = '';
  totalSize: any = 0;
  page = 1;
  pageSize = 5;
  previousPage: any = 0;
  sizeOptions: Array<any> = [
    { name: '5', value: 5 },
    { name: '10', value: 10 },
    { name: '25', value: 25 }
  ];
  constructor(
    private modalService: NgbModal,
    // private userService: ManageUserService,
    private cdr: ChangeDetectorRef,
    private authenticationService: AuthenticationService,
    private weblinkService: WeblinksService
  ) { }

  ngOnInit() {
    this.breadCrumbItems = [
      { label: 'Quatreo', path: '/' },
      { label: 'Weblinks Mapping', path: '/', active: true }
    ];

    this.getAllStates();
  }

  // fetch table value
  _fetchData(id) {
    this.loading = true;
    this.weblinkService.getCountyWebLink(id).subscribe(
      response => {
        const res = 'data';
        if (response[res]) {
          this.tableData = response[res];
          console.log(this.tableData, 'tss');

          this.totalSize = response[res].length;
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

  // create model to add new user
  openModal() {
    const addweblinks = new WeblinksModel();
    addweblinks.clear();
    this.editUserdata(addweblinks, 'Add');
  }

  // edit user details according based on id
  editUserdata(data, action) {
    console.log(data);
    // if (action === 'Edit') {
    // this.loading = true;
    // this.userService.viewUser(data.id).subscribe(
    // res => {
    // const val = 'data';
    // this.addUser(res[val], action);
    // this.loading = false;
    // },
    // err => {
    // if (err.status === 401 && err.error.error === 'invalid_token') {
    // this.authenticationService.recallApi(
    // this.editUserdata.bind(this, data, action)
    // );
    // }
    // this.loading = false;
    // }
    // );
    // } else {
    this.addUser(data, action);
    // }
  }

  addUser(res, action) {

    // console.log(res);
    const modalref = this.modalService.open(AddWeblinksComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
      keyboard: false
    });
    const data = 'data';
    modalref.componentInstance.userdata = res;
    modalref.componentInstance.action = action;
    modalref.componentInstance.passEntry.subscribe(receivedEntry => {
      console.log(this.countyId);
      if (this.countyId) {
      this._fetchData(this.countyId);
      }
    });
  }

  // Get all states
  getAllStates() {

    this.weblinkService.getAllStates().subscribe(
      res => {
        const val = 'data';
        if (res[val]) {
          this.state = res[val];
        }
      },
      err => {
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(this.getAllStates.bind(this));
        }
      }
    );
  }

  // Get all county based on state
  getCounty(id) {

    this.weblinkService.getAllCounty(id).subscribe(
      res => {
        const val = 'data';
        if (res[val]) {
          this.county = res[val];
        }
      },
      err => {
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(this.getCounty.bind(this, id));
        }
      }
    );
  }

  onFilterState(event) {
    console.log(event);
    this.tableData = [];
    this.totalSize = 0;
    this.stateId = event ? event.id : '';
    if (this.selectedCounty) {
      this.selectedCounty = '';
    }

    this.getCounty(this.stateId);
  }

  onFilterCounty(event) {
    console.log(event);
    this.countyId = event ? event.id : '';
    // fetch data
    this._fetchData(this.countyId);
  }
  // View User details
  // viewUserdata(data) {
  // this.loading = true;
  // this.userService.viewUser(data.id).subscribe(
  // res => {
  // this.loading = false;
  // const modalref = this.modalService.open(ViewUserComponent, {
  // centered: true,
  // size: 'lg',
  // backdrop: 'static',
  // keyboard: false
  // });
  // const val = 'data';
  // modalref.componentInstance.userDetails = res[val];
  // },
  // err => {
  // if (err.status === 401 && err.error.error === 'invalid_token') {
  // this.authenticationService.recallApi(
  // this.viewUserdata.bind(this, data)
  // );
  // }
  // console.log(err, 'view user err');
  // this.loading = false;
  // }
  // );
  // }

  // get status active or inactive based on true or false value
  // getStatus(state) {
  // switch (state) {
  // case true:
  // return 'Active';
  // case false:
  // return 'In-Active';
  // }
  // return '';
  // }

  // apply css class based on the status of user
  // getStatusClass(activeStatus) {
  // switch (activeStatus) {
  // case true:
  // return 'success';
  // case false:
  // return 'danger';
  // }
  // return '';
  // }

  // for search in table
  // applyFilter(value) {
  // if (value === '') {
  // this._fetchData();
  // } else {
  // const data = {
  // size: this.pageSize,
  // order: 'DESCENDING',
  // sort: 'firstName',
  // queryString: value,
  // page: this.page - 1
  // };
  // this.userService.searchUser(data).subscribe(
  // res => {
  // const val = 'data';
  // this.tableData = res[val].content;
  // this.totalSize = res[val].totalElements;
  // this.cdr.detectChanges();
  // },
  // err => {}
  // );
  // }
  // }
  // loadPage(page: number) {
  // console.log(this.page, this.pageSize);
  // if (page !== this.previousPage) {
  // this.previousPage = page;
  // if (this.searchTerm === '') {
  // this._fetchData();
  // } else {
  // this.applyFilter(this.searchTerm);
  // }
  // }
  // }
  // changePagesize() {
  // console.log('amit');
  // this.pageSize = Number(this.pageSize);
  // this.page = 1;
  // if (this.searchTerm === '') {
  // this._fetchData();
  // } else {
  // this.applyFilter(this.searchTerm);
  // }
  // }


}
