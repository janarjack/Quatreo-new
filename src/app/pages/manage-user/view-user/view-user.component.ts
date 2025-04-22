import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManageUserService } from 'src/app/core/manage-user/manage-user.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
  @Input() userDetails: any;
  viewDetail: any;
  // statusValue;

  constructor(public activeModal: NgbActiveModal) {}

  // mask phone number to US format
  public mask = [
    '(',
    /[1-9]/,
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ];

  ngOnInit() {
    this.viewDetail = this.userDetails;
    console.log(this.userDetails);
    // this.statusValue = this.viewDetail.user.active ? 'Active' : 'In-Active';
  }
}
