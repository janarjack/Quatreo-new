import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManageUserService } from 'src/app/core/manage-user/manage-user.service';
import { ManageUserModel } from 'src/app/core/manage-user/model';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { ViewUserComponent } from '../view-user/view-user.component';

@Component({
  selector: 'app-manage-user-list',
  templateUrl: './manage-user-list.component.html',
  styleUrls: ['./manage-user-list.component.scss'],
})
export class ManageUserListComponent implements OnInit {
  loading = false;

  breadCrumbItems: Array<{}>;

  tableData: any[];

  // tables$: Observable<ManageUserModel[]>;
  // total$: Observable<number>;

  searchTerm = '';
  totalSize: any = 0;
  page = 1;
  pageSize = 5;
  previousPage: any = 0;
  sizeOptions: Array<any> = [
    { name: '5', value: 5 },
    { name: '10', value: 10 },
    { name: '25', value: 25 },
  ];
  constructor(
    private modalService: NgbModal,
    private userService: ManageUserService,
    private cdr: ChangeDetectorRef,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [
      { label: 'Quatreo', path: '/' },
      { label: 'Manage User', path: '/', active: true },
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
      sort: 'id',
      page: Number(this.page) - 1,
    };
    this.userService.getAllUsers(querparams).subscribe(
      (response) => {
        const res = 'data';
        if (response[res]) {
          this.tableData = response[res].content;
          this.totalSize = response[res].totalElements;
          this.cdr.detectChanges();
        }
        this.loading = false;
      },
      (err) => {
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(this._fetchData.bind(this));
        }
        this.loading = false;
      }
    );
  }

  // create model to add new user
  openModal() {
    const adduser = new ManageUserModel();
    adduser.clear();
    this.editUserdata(adduser, 'Add');
  }

  // edit user details according based on id
  editUserdata(data, action) {
    console.log(data);
    if (action === 'Edit') {
      this.loading = true;
      this.userService.viewUser(data.id).subscribe(
        (res) => {
          const val = 'data';
          this.addUser(res[val], action);
          this.loading = false;
        },
        (err) => {
          if (err.status === 401 && err.error.error === 'invalid_token') {
            this.authenticationService.recallApi(
              this.editUserdata.bind(this, data, action)
            );
          }
          this.loading = false;
        }
      );
    } else {
      this.addUser(data, action);
    }
  }

  addUser(res, action) {
    console.log(res);
    const modalref = this.modalService.open(AddUserComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
    // const data = 'data';
    modalref.componentInstance.userdata = res;
    modalref.componentInstance.action = action;
    // modalref.componentInstance.clientdata = {
    //   data: res,
    //   name
    // };
    modalref.componentInstance.passEntry.subscribe((receivedEntry) => {
      this._fetchData();
    });
  }

  // View User details
  viewUserdata(data) {
    // console.log(data);
    this.loading = true;
    this.userService.viewUser(data.id).subscribe(
      (res) => {
        this.loading = false;
        const modalref = this.modalService.open(ViewUserComponent, {
          centered: true,
          size: 'lg',
          backdrop: 'static',
          keyboard: false,
        });
        const val = 'data';
        modalref.componentInstance.userDetails = res[val];
      },
      (err) => {
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(
            this.viewUserdata.bind(this, data)
          );
        }
        console.log(err, 'view user err');
        this.loading = false;
      }
    );
  }

  // get status active or inactive based on true or false value
  getStatus(state) {
    switch (state) {
      case true:
        return 'Active';
      case false:
        return 'In-Active';
    }
    return '';
  }

  // apply css class based on the status of user
  getStatusClass(activeStatus) {
    switch (activeStatus) {
      case true:
        return 'success';
      case false:
        return 'danger';
    }
    return '';
  }

  // for search in table
  applyFilter(value) {
    if (value === '') {
      this._fetchData();
    } else {
      const data = {
        size: this.pageSize,
        order: 'DESCENDING',
        sort: 'firstName',
        queryString: value,
        page: Number(this.page) - 1,
      };
      this.userService.searchUser(data).subscribe(
        (res) => {
          const val = 'data';
          this.tableData = res[val].content;
          this.totalSize = res[val].totalElements;
          this.cdr.detectChanges();
        },
        (err) => {}
      );
    }
  }
  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.searchTerm === ''
        ? this._fetchData()
        : this.applyFilter(this.searchTerm);
    }
  }
  changePagesize() {
    console.log('amit');
    this.pageSize = Number(this.pageSize);
    this.page = 1;
    if (this.searchTerm === '') {
      this._fetchData();
    } else {
      this.applyFilter(this.searchTerm);
    }
  }
}
