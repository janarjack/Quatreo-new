import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ManageClientService } from 'src/app/core/manage-client/manage-client.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { ManageClientModel } from '../../../core/manage-client/models/manage-client.model';
import { AddClientComponent } from '../add-client/add-client.component';
import { ViewClientComponent } from '../view-client/view-client.component';
@Component({
  selector: 'app-manage-client-list',
  templateUrl: './manage-client-list.component.html',
  styleUrls: ['./manage-client-list.component.scss']
})
export class ManageClientListComponent implements OnInit {
  searchTerm = '';
  totalSize: any = 0;
  breadCrumbItems: Array<{}>;
  loading = false;
  tableData: any = [];
  page = 1;
  pageSize = 5;
  tables$: Observable<ManageClientModel[]>;
  total$: Observable<number>;
  previousPage: any = 0;
  sizeOptions: Array<any> = [
    { name: '5', value: 5 },
    { name: '10', value: 10 },
    { name: '25', value: 25 }
  ];

  constructor(
    private modalService: NgbModal,
    private clientService: ManageClientService,
    private cdr: ChangeDetectorRef,
    private authenticationService: AuthenticationService,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [
      { label: 'Quatreo', path: '/' },
      { label: 'Manage Client', path: '/', active: true }
    ];

    /**
     * fetch data
     */
    this._fetchData();
  }

  /**
   * fetches the table value
   */
  // get client data
  _fetchData() {
    this.loading = true;
    const querparams = {
      size: this.pageSize,
      order: 'DESCENDING',
      sort: 'id',
      page: Number(this.page) - 1
    };
    this.clientService.getAllClients(querparams).subscribe(
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
  // Create modal for adding new client
  openModal() {
    const addclient = new ManageClientModel();
    // addclient.clear();
    this.editClientdata(addclient, 'add');
  }

  // Edit or add client
  editClientdata(data, name) {
    console.log(data);
    if (name === 'edit') {
      this.loading = true;
      this.clientService.viewClient(data.id).subscribe(
        res => {
          const val = 'data';
          this.addClient(res[val], name);
          this.loading = false;
        },
        err => {
          if (err.status === 401 && err.error.error === 'invalid_token') {
            this.authenticationService.recallApi(
              this.editClientdata.bind(this, data, name)
            );
          }
          this.loading = false;
        }
      );
    } else {
      this.addClient(data, name);
    }
  }
  // Open add client popup and send data to it is edit
  addClient(res, name) {
    console.log(res);
    const modalref = this.modalService.open(AddClientComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
      keyboard: false
      // windowClass: 'animated fadeIn'
    });
    const data = 'data';
    modalref.componentInstance.clientdata = {
      data: res,
      name
    };
    modalref.componentInstance.passEntry.subscribe(receivedEntry => {
      if (this.searchTerm === '') {
        this._fetchData();
      } else {
        this.applyFilter(this.searchTerm);
      }
    });
  }
  // View Clien details
  viewClientdata(data) {
    console.log(data);
    this.loading = true;
    this.clientService.viewClient(data.id).subscribe(
      res => {
        this.loading = false;
        const modalref = this.modalService.open(ViewClientComponent, {
          centered: true,
          size: 'lg',
          backdrop: 'static',
          keyboard: false
        });
        const val = 'data';
        modalref.componentInstance.clientDetails = res[val];
      },
      err => {
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(
            this.viewClientdata.bind(this, data)
          );
        }
        console.log(err, 'view client err');
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

  // Apply css class based on the status of client
  getStatusClass(activeStatus) {
    switch (activeStatus) {
      case true:
        return 'success';
      case false:
        return 'danger';
    }
    return '';
  }
  // Search according to client name or email
  applyFilter(value) {
    if (value === '') {
      this._fetchData();
    } else {
      const data = {
        size: this.pageSize,
        order: 'DESCENDING',
        sort: 'clientName',
        queryString: value,
        page: this.page - 1
      };
      this.clientService.searchClient(data).subscribe(
        res => {
          const val = 'data';
          this.tableData = res[val].content;
          this.totalSize = res[val].totalElements;
          this.cdr.detectChanges();
        },
        err => {
          if (err.status === 401 && err.error.error === 'invalid_token') {
            this.authenticationService.recallApi(
              this.applyFilter.bind(this, value)
            );
          }
        }
      );
    }
  }
  // Fetch data according to page number
  loadPage(page: number) {
    console.log(this.page, this.pageSize);
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.searchTerm === ''
        ? this._fetchData()
        : this.applyFilter(this.searchTerm);
    }
  }
  // Number of rows is listing can be changed
  changePagesize() {
    console.log('amit');
    this.pageSize = Number(this.pageSize);
    this.page = 1;
    this.searchTerm === ''
      ? this._fetchData()
      : this.applyFilter(this.searchTerm);
  }
}
