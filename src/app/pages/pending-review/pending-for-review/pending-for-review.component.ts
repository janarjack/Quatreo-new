import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ViewTeamMemberComponent } from '../../team-member-main-screen/view-team-member/view-team-member.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PendingForReviewService } from 'src/app/core/pending-for-review/pending-for-review.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { ManageClientService } from 'src/app/core/manage-client/manage-client.service';
import { ToastrService } from 'ngx-toastr';
import { TeamMemberModel } from 'src/app/core/team-member-screen/model';
import { OrderDetailsComponent } from '../../team-member-main-screen/order-details/order-details.component';
import { ReviewOrderComponent } from '../review-order/review-order.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MarkAsCompletedComponent } from '../mark-as-completed/mark-as-completed.component';

@Component({
  selector: 'app-pending-for-review',
  templateUrl: './pending-for-review.component.html',
  styleUrls: ['./pending-for-review.component.scss'],
})
export class PendingForReviewComponent implements OnInit {
  searchTerm = '';
  orderDetails = [];
  breadCrumbItems: Array<{}>;
  tableData: any[] = [];
  selectClient: string[];
  pageSize = 5;
  page = 1;
  loading = false;
  previousPage: any = 0;
  totalSize: any = 0;
  clientname: any = '';
  sizeOptions: Array<any> = [
    { name: '5', value: 5 },
    { name: '10', value: 10 },
    { name: '25', value: 25 },
  ];
  isCompleted = false;
  constructor(
    private modalService: NgbModal,
    private reviewService: PendingForReviewService,
    private authenticationService: AuthenticationService,
    private cdr: ChangeDetectorRef,
    private clientService: ManageClientService,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
    this.getOrderList();
    console.log('tableData', this.tableData);
    this.breadCrumbItems = [
      { label: 'Quatreo', path: '/' },
      { label: 'Review Orders', path: '/', active: true },
    ];
  }

  convertDateToString(dateToBeConverted: string) {
    if (dateToBeConverted) {
      return new Date(dateToBeConverted.replace(/-/g, ' '));
    }
  }

  // create modal for adding new client
  openModal() {
    const addclient = new TeamMemberModel();
    addclient.clear();
    this.editClientdata(addclient);
  }
  onFilter(event) {
    console.log(event);
    this.clientname = event ? event.clientName : '';
  }

  // getTeamMemberList
  getOrderList() {
    this.loading = true;
    this.reviewService.getOrderList(sessionStorage.uid).subscribe(
      (response) => {
        const res = 'data';
        if (response[res]) {
          this.tableData = response[res];
          console.log(this.tableData, 'ggg');
          this.totalSize = this.tableData.length;
          this.cdr.detectChanges();
        }
        this.loading = false;
      },
      (err) => {
        console.log(err, 'error');
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(this.getOrderList.bind(this));
        }

        this.loading = false;
      }
    );
  }

  // edit or add client
  editClientdata(data) {
    console.log(data);
    const modalref = this.modalService.open(ReviewOrderComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
    modalref.componentInstance.orderdata = data;

    modalref.componentInstance.passEntry.subscribe((receivedEntry) => {
      console.log(receivedEntry);
      this.getOrderList();
    });
  }

  // View Team Member details
  viewTeamMemberData(data) {
    console.log(data);

    const modalref = this.modalService.open(ViewTeamMemberComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
    modalref.componentInstance.orderDetails = data;
  }
  confirm(table, content: string) {
    const modalref = this.modalService.open(MarkAsCompletedComponent, {
      centered: true,
      size: 'md',
      backdrop: 'static',
      keyboard: false,
    });
    modalref.componentInstance.orderdetails = table.userOrderDetails[1];
    modalref.componentInstance.userOrderId = table.userOrderDetails[0];
    modalref.componentInstance.passEntry.subscribe((receivedEntry) => {
      // console.log(receivedEntry);
      this.getOrderList();
    });
  }
}
