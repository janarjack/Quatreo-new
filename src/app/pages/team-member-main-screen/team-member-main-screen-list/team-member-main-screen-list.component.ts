import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TeamMemberData } from './data';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { TeamMemberModel } from 'src/app/core/team-member-screen/model';
import { ViewTeamMemberComponent } from '../view-team-member/view-team-member.component';
import { TeamMemberService } from 'src/app/core/team-member-screen/team-member.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { ManageClientService } from 'src/app/core/manage-client/manage-client.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-team-member-main-screen-list',
  templateUrl: './team-member-main-screen-list.component.html',
  styleUrls: ['./team-member-main-screen-list.component.scss'],
})
export class TeamMemberMainScreenListComponent implements OnInit {
  searchTerm = '';
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
    private teamMemberService: TeamMemberService,
    private authenticationService: AuthenticationService,
    private cdr: ChangeDetectorRef,
    private clientService: ManageClientService,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
    this.getAllClientList();
    this.getTeamMemberList();
    console.log('tableData', this.tableData);
    this.breadCrumbItems = [
      { label: 'Quatreo', path: '/' },
      { label: 'Team Member Main Screen', path: '/', active: true },
    ];
  }
  // display new orders
  newOrders() {
    // this.tableData = TeamMemberData;
    // console.log(TeamMemberData);
    this.loading = true;
    const querparams = {
      size: this.pageSize,
      order: 'DESCENDING',
      sort: 'clientName',
      page: Number(this.page) - 1,
    };

    this.teamMemberService.assignNewOrder(sessionStorage.uid).subscribe(
      (response) => {
        const res = 'data';
        if (response[res].length === 0) {
          this.toaster.error('No Orders available');
        }
        if (response[res]) {
          response[res].forEach((element) => {
            this.tableData.push(element);
          });
          for (const iterator of this.tableData) {
            this.isCompleted =
              iterator.userOrderDetails[0].userOrder.order.status.statusName ===
              'ASSIGNED'
                ? true
                : false;
            if (this.isCompleted) {
              break;
            }
          }
          this.totalSize = this.tableData.length;
          this.cdr.detectChanges();
        }
        this.loading = false;
      },
      (err) => {
        console.log(err, 'error');
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(this.newOrders.bind(this));
        }
        if (err.error.message) {
          this.toaster.error(err.error.message);
        }
        this.loading = false;
      }
    );
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

  // get all client list
  getAllClientList() {
    this.teamMemberService
      .getClientbyUserid(sessionStorage.getItem('uid'))
      .subscribe(
        (response) => {
          if (response) {
            const val = 'data';
            this.selectClient = response[val];
          }
        },
        (err) => {
          if (err.status === 401 && err.error.error === 'invalid_token') {
            this.authenticationService.recallApi(
              this.getAllClientList.bind(this)
            );
          }
        }
      );
  }

  // getTeamMemberList
  getTeamMemberList() {
    this.loading = true;
    this.teamMemberService.getTeamMemberList(sessionStorage.uid).subscribe(
      (response) => {
        const res = 'data';
        if (response[res]) {
          this.tableData = response[res];
          console.log(this.tableData, 'ggg');
          for (const iterator of this.tableData) {
            this.isCompleted =
              iterator.userOrderDetails[0].userOrder.order.status.statusName ===
              'ASSIGNED'
                ? true
                : false;
            if (this.isCompleted) {
              break;
            }
          }

          this.totalSize = this.tableData.length;
          this.cdr.detectChanges();
        }
        this.loading = false;
      },
      (err) => {
        console.log(err, 'error');
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(
            this.getTeamMemberList.bind(this)
          );
        }

        this.loading = false;
      }
    );
  }

  // edit or add client
  editClientdata(data) {
    console.log(data);
    const modalref = this.modalService.open(OrderDetailsComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
    modalref.componentInstance.orderdata = data;

    modalref.componentInstance.passEntry.subscribe((receivedEntry) => {
      console.log(receivedEntry);
      this.getTeamMemberList();
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
    // const val = 'data';
    modalref.componentInstance.orderDetails = data;
    // },
    // err => {
    //   if (err.status === 401 && err.error.error === 'invalid_token') {
    //     this.authenticationService.recallApi(
    //       this.viewOrderData.bind(this, data)
    //     );
    //   }
    //     console.log(err, 'view client err');
    //     this.loading = false;
    //   }
    // );
  }

  // Search according to client name or email
  applyFilter(value) {
    if (value === '') {
      this.newOrders();
    } else {
      const data = {
        size: this.pageSize,
        order: 'DESCENDING',
        sort: 'clientName',
        queryString: value,
        page: this.page - 1,
      };
      this.teamMemberService.searchClient(data).subscribe(
        (res) => {
          const val = 'data';
          this.tableData = res[val].content;
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

  // changePagesize() {
  //   console.log('amit');
  //   this.pageSize = Number(this.pageSize);
  //   this.page = 1;
  //   this.clientname === ''
  //     ? this.newOrders()
  //     : this.onFilter(this.searchTerm);
  // }
}
