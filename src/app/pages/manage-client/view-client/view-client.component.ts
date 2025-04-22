import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManageClientService } from 'src/app/core/manage-client/manage-client.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.scss']
})
export class ViewClientComponent implements OnInit {
  @Input() clientDetails: any;
  viewDetail: any;
  pdf: any;
  image: any;
  loading = false;
  imgext: any[] = ['png', 'jpeg', 'jpg', 'svg'];
  constructor(
    public activeModal: NgbActiveModal,
    private clientService: ManageClientService,
    private toaster: ToastrService,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private authenticationService: AuthenticationService
  ) {}
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
  // Get client details
  ngOnInit() {
    this.viewDetail = this.clientDetails;
    this.viewDetail.clientSubProd.forEach((ele, i) => {
      if (ele.subProductMaster.subProductName === 'Tax') {
        this.viewDetail.clientSubProd.splice(i, 1);
      }
    });
  }
  // View file if it is pdf or an image
  downloadFile(file, type, content: string) {
    const ext = file.file.substr(file.file.lastIndexOf('.') + 1);
    this.image = '';
    this.pdf = '';
    this.loading = true;
    this.clientService.downloadFiles(file.id).subscribe(
      res => {
        const val = 'data';
        this.loading = false;
        if (ext === 'pdf') {
          const logo = 'data:application/pdf;base64,' + res[val].data;
          this.pdf = this.sanitizer.bypassSecurityTrustResourceUrl(logo);
          this.modalService.open(content, { centered: true, size: 'lg' });
        } else if (this.imgext.indexOf(ext) !== -1) {
          const logo = 'data:image/jpeg;base64,' + res[val].data;
          this.image = this.sanitizer.bypassSecurityTrustUrl(logo);
          this.modalService.open(content, { centered: true, size: 'lg' });
        } else {
          this.toaster.error('File format .' + ext + ' cannot be viewed');
        }
      },
      err => {
        this.loading = false;
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(
            this.downloadFile.bind(this, file, type, content)
          );
        }
        if (err.error.message) {
          this.toaster.error(err.error.message);
        }
      }
    );
  }
}
