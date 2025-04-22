import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddOrderComponent } from '../add-order/add-order.component';
import { ViewOrderComponent } from '../view-order/view-order.component';
import { ManageOrderService } from 'src/app/core/manage-order/manage-order.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-order-management-list',
  templateUrl: './order-management-list.component.html',
  styleUrls: ['./order-management-list.component.scss'],
})
export class OrderManagementListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  tableData: any[];
  page = 1;
  pageSize = 5;
  loading = false;
  totalSize: any = 0;
  searchTerm = '';
  previousPage: any = 0;
  tables$: Observable<any[]>;
  total$: Observable<number>;
  sizeOptions: Array<any> = [
    { name: '5', value: 5 },
    { name: '10', value: 10 },
    { name: '25', value: 25 },
  ];
  constructor(
    private modalService: NgbModal,
    private orderService: ManageOrderService,
    private authenticationService: AuthenticationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [
      { label: 'Quatreo', path: '/' },
      { label: 'Order Management', path: '/', active: true },
    ];
    this.getOrderLists();
  }

  // fetch table value
  getOrderLists() {
    this.loading = true;
    const querparams = {
      size: this.pageSize,
      order: 'DESCENDING',
      sort: 'id',
      page: Number(this.page) - 1,
    };
    this.orderService.getAllOrders(querparams).subscribe(
      (response) => {
        const res = 'data';
        if (response[res]) {
          this.tableData = response[res].content;
          console.log(this.tableData, 'tsnl');

          this.totalSize = response[res].totalElements;
          this.cdr.detectChanges();
        }
        this.loading = false;
      },
      (err) => {
        console.log(err, 'error');
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(this.getOrderLists.bind(this));
        }

        this.loading = false;
      }
    );
  }

  // open create new order Modal
  openModal() {
    this.editOrderdata({}, 'Add');
  }

  // Update Order
  editOrderdata(data, action) {
    console.log(data);
    if (action === 'Edit') {
      this.loading = true;
      this.orderService.viewOrder(data.id).subscribe(
        (res) => {
          this.loading = false;
          const val = 'data';
          console.log(res[val], 'dataisl');

          this.addOrder(res[val], action);
        },
        (err) => {
          if (err.status === 401 && err.error.error === 'invalid_token') {
            this.authenticationService.recallApi(
              this.editOrderdata.bind(this, data, action)
            );
          }
          console.log(err, 'view client err');
          this.loading = false;
        }
      );
    } else {
      this.addOrder(data, action);
    }
  }

  convertDateToString(dateToBeConverted: string) {
    if (dateToBeConverted) {
      return new Date(dateToBeConverted.replace(/-/g, ' '));
    }
  }

  addOrder(data, action) {
    const modalref = this.modalService.open(AddOrderComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
    modalref.componentInstance.orderdata = data;
    modalref.componentInstance.action = action;
    modalref.componentInstance.passEntry.subscribe((receivedEntry) => {
      if (this.searchTerm === '') {
        this.getOrderLists();
      } else {
        this.applyFilter(this.searchTerm);
      }
    });
  }
  // View Order details
  viewOrderData(data) {
    console.log(data);
    this.loading = true;
    this.orderService.viewOrder(data.id).subscribe(
      (res) => {
        this.loading = false;
        const modalref = this.modalService.open(ViewOrderComponent, {
          centered: true,
          size: 'lg',
          backdrop: 'static',
          keyboard: false,
        });
        const val = 'data';
        modalref.componentInstance.orderDetails = res[val];
      },
      (err) => {
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(
            this.viewOrderData.bind(this, data)
          );
        }
        console.log(err, 'view client err');
        this.loading = false;
      }
    );
  }
  // Search according to client name or email
  applyFilter(value) {
    if (value === '') {
      this.getOrderLists();
    } else {
      const data = {
        size: this.pageSize,
        order: 'DESCENDING',
        sort: 'clientOrderNumber',
        queryString: value,
        page: this.page - 1,
      };
      this.orderService.searchOrders(data).subscribe(
        (res) => {
          const val = 'data';
          this.tableData = res[val].content;
          console.log(this.tableData, 'serach');
          this.totalSize = res[val].totalElements;
          this.cdr.detectChanges();
        },
        (err) => {
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
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.searchTerm === ''
        ? this.getOrderLists()
        : this.applyFilter(this.searchTerm);
    }
  }
  // Number of rows is listing can be changed
  changePagesize() {
    console.log('amit');
    this.pageSize = Number(this.pageSize);
    this.page = 1;
    this.searchTerm === ''
      ? this.getOrderLists()
      : this.applyFilter(this.searchTerm);
  }
}
