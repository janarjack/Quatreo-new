import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderUploadMLSRoutingModule } from './order-upload-MLS-routing.module';
import { OrderUploadMLSComponent } from './order-upload-MLS/order-upload-MLS.component';
import {
  NgbModalModule,
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [OrderUploadMLSComponent],
  imports: [
    CommonModule,
    OrderUploadMLSRoutingModule,
    NgbModalModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    UIModule,
    NgSelectModule,
    FormsModule,
  ],
  entryComponents: [],
})
export class OrderUploadMLSModule {}
