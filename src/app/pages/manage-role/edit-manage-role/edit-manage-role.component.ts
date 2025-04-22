import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-manage-role',
  templateUrl: './edit-manage-role.component.html',
  styleUrls: ['./edit-manage-role.component.scss']
})
export class EditManageRoleComponent implements OnInit {

  @Input() public status;
  heading: string;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();


  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
   console.log(status);
   this.togglePopup();
   this.sweetAlert();
  }
  // Activate and Deactivate popup
  togglePopup() {

    if (status === 'true') {
      this.heading = 'Activate';
    } else {
      this.heading = 'Deactivate';
    }
  }

  // passing yes or cancel
  passData(data) {
    this.passEntry.emit(data);
  }


  // alert to activate or deactivate status
  sweetAlert() {
    Swal.fire({
      title: 'Are you sure you want to ' + this.heading + '?',
      // text: 'You won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, ' + this.heading + ' it!',
      cancelButtonText: 'No, cancel!',
      confirmButtonClass: 'btn btn-success mt-2',
      cancelButtonClass: 'btn btn-danger ml-2 mt-2',
      buttonsStyling: false
  }).then((result) => {

    this.passData(result);
    if (result.value) {
          Swal.fire({
              title: this.heading + 'd!',
              text: 'Status Changed',
              type: 'success'
          });
      } else if (
          // Read more about handling dismissals
          result.dismiss === Swal.DismissReason.cancel
      ) {
          Swal.fire({
              title: 'Cancelled',
              text: 'Status not changed',
              type: 'error'
          });
      }
    this.activeModal.dismiss('Cross click');
  });
  }
}
