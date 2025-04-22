import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BulkOrdersRoutingModule } from './bulk-orders-routing.module';
import { BulkOrdersListComponent } from './bulk-orders-list/bulk-orders-list.component';
import {
  NgbModalModule,
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ErrorFileComponent } from './error-file/error-file.component';

@NgModule({
  declarations: [BulkOrdersListComponent, ErrorFileComponent],
  imports: [
    CommonModule,
    BulkOrdersRoutingModule,
    NgbModalModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    UIModule,
    NgSelectModule,
    FormsModule,
  ],
  entryComponents: [ErrorFileComponent],
})
export class BulkOrdersModule {}
