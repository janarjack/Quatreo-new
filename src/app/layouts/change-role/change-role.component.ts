import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-change-role',
  templateUrl: './change-role.component.html',
  styleUrls: ['./change-role.component.scss']
})
export class ChangeRoleComponent implements OnInit {

  public roles: Array<string> = ['Admin', 'Client'];
  closeResult = '';

  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }


}
