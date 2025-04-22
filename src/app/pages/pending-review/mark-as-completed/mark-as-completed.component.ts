import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PendingForReviewService } from 'src/app/core/pending-for-review/pending-for-review.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { TeamMemberService } from 'src/app/core/team-member-screen/team-member.service';

@Component({
  selector: 'app-mark-as-completed',
  templateUrl: './mark-as-completed.component.html',
  styleUrls: ['./mark-as-completed.component.scss'],
})
export class MarkAsCompletedComponent implements OnInit {
  @Input() orderdetails: any;
  @Input() userOrderId: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  isloading = false;
  constructor(
    public activeModal: NgbActiveModal,
    private toaster: ToastrService,
    private authenticationService: AuthenticationService,
    private teamService: TeamMemberService,
    private sanitizer: DomSanitizer,
    private reviewService: PendingForReviewService
  ) {}

  ngOnInit() {}
  markAsCompleted() {
    const val = 'subProduct';
    const isCompleted = this.orderdetails[val].filter((ele) => {
      return ele.orderAttachments.statusMaster.statusName === 'COMPLETED';
    });
    console.log(isCompleted, 'isCompleted');
    if (isCompleted.length === this.orderdetails[val].length) {
      const value = 'userOrder';
      const data = {
        userId: Number(sessionStorage.uid),
        userOrderId: this.userOrderId[value].id,
      };
      this.isloading = true;
      this.reviewService.reviewAsCompleted(data).subscribe(
        (res) => {
          this.passEntry.emit('ok');
          this.isloading = false;
          this.activeModal.close();
          this.toaster.success('Order processed successfully');
        },
        (err) => {
          if (err.status === 401 && err.error.error === 'invalid_token') {
            this.authenticationService.recallApi(
              this.markAsCompleted.bind(this)
            );
          }
          this.isloading = false;
          if (err.error.message) {
            this.toaster.error(err.error.message);
          }
        }
      );
    } else {
      this.toaster.error(
        'Products status must be completed to process the order '
      );
    }
  }
}
