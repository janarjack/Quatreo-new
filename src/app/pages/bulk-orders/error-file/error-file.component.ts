import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import * as FileSaver from 'file-saver';
import { BulkOrdersRoutingModule } from '../bulk-orders-routing.module';
import { BulkOrdersService } from 'src/app/core/bulk-orders/bulk-orders.service';

@Component({
  selector: 'app-error-file',
  templateUrl: './error-file.component.html',
  styleUrls: ['./error-file.component.scss'],
})
export class ErrorFileComponent implements OnInit {
  @Input() errorData: any[];
  @Input() errorId: any[];
  constructor(public activeModal: NgbActiveModal,
              private authenticationService: AuthenticationService,
              private toastr: ToastrService,
              private bulkOrderService: BulkOrdersService
    ) {}
  tableData: any[] = [];
  page = 1;
  pageSize = 5;
  loading = false;
  totalSize: any = 0;
  previousPage: any = 0;
  iscsvloading = false;

  sizeOptions: Array<any> = [
    { name: '5', value: 5 },
    { name: '10', value: 10 },
    { name: '25', value: 25 },
  ];
  ngOnInit() {
    this.tableData = this.errorData;
    this.totalSize = this.tableData.length;
  }

  downloadErrorFile() {
    this.iscsvloading = true;

    this.bulkOrderService.downloadErrorFile(this.errorId).subscribe(
        (res) => {
          const val = 'data';
          this.downloadFile(res[val].byteArray);
        },
        (err) => {
          this.iscsvloading = false;
          if (err.status === 401 && err.error.error === 'invalid_token') {
            this.authenticationService.recallApi(
              this.downloadErrorFile.bind(this)
            );
          }
          if (err.error.message) {
            this.toastr.error(err.error.message);
          }
        }
      );

  }

 downloadFile(blobContent) {
    this.iscsvloading = false;
    const blob = new Blob([this.base64toBlob(blobContent, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')], {});
    FileSaver.saveAs(blob, 'error-file.xlsx');
}

 base64toBlob(base64Data, contentType) {
    contentType = contentType || '';
    const sliceSize = 1024;
    const byteCharacters = atob(base64Data);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);
    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        const begin = sliceIndex * sliceSize;
        const end = Math.min(begin + sliceSize, bytesLength);

        const bytes = new Array(end - begin);
        for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
}
}
