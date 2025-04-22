import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ManageRoleModel } from 'src/app/core/manage-role/model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditManageRoleComponent } from '../edit-manage-role/edit-manage-role.component';
import { ManageRoleService } from 'src/app/core/manage-role/manage-role.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-manage-role-list',
  templateUrl: './manage-role-list.component.html',
  styleUrls: ['./manage-role-list.component.scss']
})
export class ManageRoleListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  tableData: any = [];
  tables$: Observable<ManageRoleModel[]>;
  total$: Observable<number>;
  status: any;
  loading = false;

  constructor(
    private modalService: NgbModal,
    private roleService: ManageRoleService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [
      { label: 'Quatreo', path: '/' },
      { label: 'Manage Role', path: '/', active: true }
    ];

    // fetch data
    this._fetchData();
  }

  // Fetch table value
  _fetchData() {
    this.loading = true;
    this.roleService.getAllRoleList().subscribe(
      response => {
        const res = 'data';
        if (response[res]) {
          this.tableData = response[res];
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

  // edit role status
  editManageRoledata(event) {
    status = event.target.checked;
    const modalref = this.modalService.open(EditManageRoleComponent, {
      centered: true,
      size: 'sm'
    });
    modalref.componentInstance.status = this.status;

    modalref.componentInstance.passEntry.subscribe(receivedEntry => {
      console.log(receivedEntry);
      if (
        (receivedEntry.value && event.target.checked === true) ||
        (receivedEntry.dismiss && event.target.checked === false)
      ) {
        event.target.checked = true;
      } else {
        event.target.checked = false;
      }
    });
  }
}
