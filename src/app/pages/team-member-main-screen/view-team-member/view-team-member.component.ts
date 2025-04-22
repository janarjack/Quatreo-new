import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TeamMemberService } from 'src/app/core/team-member-screen/team-member.service';

@Component({
  selector: 'app-view-team-member',
  templateUrl: './view-team-member.component.html',
  styleUrls: ['./view-team-member.component.scss'],
})
export class ViewTeamMemberComponent implements OnInit {
  @Input() orderDetails: any;
  viewDetail: any;
  loading = false;
  pdf: any;
  imgext: any[] = ['png', 'jpeg', 'jpg', 'svg'];
  image: any;
  constructor(
    public activeModal: NgbActiveModal,
    private toaster: ToastrService,
    private authenticationService: AuthenticationService,
    private teamService: TeamMemberService,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    console.log(this.orderDetails);
    this.viewDetail = this.orderDetails;
  }
  convertDateToString(dateToBeConverted: string) {
    if (dateToBeConverted) {
      return new Date(dateToBeConverted.replace(/-/g, ' '));
    }
  }

  // View file if it is pdf or an image
  ViewFile(file, content: string) {
    const ext = file.fileName.substr(file.fileName.lastIndexOf('.') + 1);
    this.image = '';
    this.pdf = '';
    this.loading = true;
    this.teamService.viewFile(file.id).subscribe(
      (res) => {
        const val = 'data';
        this.loading = false;
        if (res[val]) {
          if (ext === 'pdf') {
            const logo = 'data:application/pdf;base64,' + res[val].byteArray;
            this.pdf = this.sanitizer.bypassSecurityTrustResourceUrl(logo);
            this.modalService.open(content, { centered: true, size: 'lg' });
          } else if (this.imgext.indexOf(ext) !== -1) {
            const logo = 'data:image/jpeg;base64,' + res[val].byteArray;
            this.image = this.sanitizer.bypassSecurityTrustUrl(logo);
            this.modalService.open(content, { centered: true, size: 'lg' });
          } else {
            this.toaster.error('File format .' + ext + ' cannot be viewed');
          }
        }
      },
      (err) => {
        this.loading = false;
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(
            this.ViewFile.bind(this, file, content)
          );
        }
        if (err.error.message) {
          this.toaster.error(err.error.message);
        }
      }
    );
  }
  viewOrderAttachments(file, content) {
    const ext = file.fileName.substr(file.fileName.lastIndexOf('.') + 1);
    this.image = '';
    this.pdf = '';
    this.loading = true;
    this.teamService.viewAttachment(file.id).subscribe(
      (res) => {
        const val = 'data';
        this.loading = false;
        if (res[val]) {
          if (ext === 'pdf') {
            const logo = 'data:application/pdf;base64,' + res[val].byteArray;
            this.pdf = this.sanitizer.bypassSecurityTrustResourceUrl(logo);
            this.modalService.open(content, { centered: true, size: 'lg' });
          } else if (this.imgext.indexOf(ext) !== -1) {
            const logo = 'data:image/jpeg;base64,' + res[val].byteArray;
            this.image = this.sanitizer.bypassSecurityTrustUrl(logo);
            this.modalService.open(content, { centered: true, size: 'lg' });
          } else {
            this.toaster.error('File format .' + ext + ' cannot be viewed');
          }
        }
      },
      (err) => {
        this.loading = false;
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(
            this.viewOrderAttachments.bind(this, file, content)
          );
        }
        if (err.error.message) {
          this.toaster.error(err.error.message);
        }
      }
    );
  }
}
