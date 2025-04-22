import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersData } from '../../order-management/order-management-list/data';
import { BulkOrdersService } from 'src/app/core/bulk-orders/bulk-orders.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { ErrorFileComponent } from '../error-file/error-file.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bulk-orders-list',
  templateUrl: './bulk-orders-list.component.html',
  styleUrls: ['./bulk-orders-list.component.scss'],
})
export class BulkOrdersListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  tableData: any[] = [];
  page = 1;
  pageSize = 5;
  loading = false;
  totalSize: any = 0;
  previousPage: any = 0;

  sizeOptions: Array<any> = [
    { name: '5', value: 5 },
    { name: '10', value: 10 },
    { name: '25', value: 25 },
  ];
  permissions = {
    bulk_order_err_download: false,
    bulk_order_status: false,
  };
  constructor(
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef,
    private bulkOrderService: BulkOrdersService,
    private authenticationService: AuthenticationService,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [
      { label: 'Quatreo', path: '/' },
      { label: 'Bulk Orders', path: '/', active: true },
    ];
    let userPermissions = [];
    userPermissions = JSON.parse(sessionStorage.permissions);
    userPermissions.forEach((element) => {
      for (const k in this.permissions) {
        if (element.permissionName === k) {
          this.permissions[k] = element.status;
        }
      }
    });
    this.getOrderLists();
  }

  // fetch table value
  getOrderLists() {
    this.loading = true;
    // const querparams = {
    //   size: this.pageSize,
    //   order: 'DESCENDING',
    //   sort: 'id',
    //   page: Number(this.page) - 1,
    // };
    this.bulkOrderService.getAllBulkOrders().subscribe(
      (response) => {
        const res = 'data';
        if (response[res]) {
          this.tableData = response[res];

          this.totalSize = response[res].length;
          this.cdr.detectChanges();
        }
        this.loading = false;
      },
      (err) => {
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(this.getOrderLists.bind(this));
        }

        this.loading = false;
      }
    );
  }

  // Number of rows is listing can be changed
  changePagesize() {
    this.pageSize = Number(this.pageSize);
    this.page = 1;
    // this.searchTerm === ''
    // ? this.getOrderLists()
    // : this.applyFilter(this.searchTerm);
  }

  openErrorfile(data) {
    this.loading = true;
    this.bulkOrderService.openErrorFile(data.id).subscribe(
      (response) => {
        const res = 'data';
        if (response[res]) {
          this.errorFile(response[res].errorTrace, data.id);

          this.cdr.detectChanges();
        }
        this.loading = false;
      },
      (err) => {
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(
            this.openErrorfile.bind(this, data)
          );
        }
        if (err.error.message) {
          this.toaster.error(err.error.message);
        }

        this.loading = false;
      }
    );
  }
  errorFile(res, id) {
    const modalref = this.modalService.open(ErrorFileComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      // windowClass: 'animated fadeIn'
    });
    modalref.componentInstance.errorData = res;
    modalref.componentInstance.errorId = id;
    // modalref.componentInstance.passEntry.subscribe((receivedEntry) => {
    //   this.getOrderLists();
    // });
  }
}
