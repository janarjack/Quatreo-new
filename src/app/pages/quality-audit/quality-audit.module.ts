import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QualityAuditRoutingModule } from './quality-audit-routing.module';
import { QualityAuditListComponent } from './quality-audit-list/quality-audit-list.component';
import {
  NgbTypeaheadModule,
  NgbDatepickerModule,
  NgbModalModule,
  NgbPaginationModule
} from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TextMaskModule } from 'angular2-text-mask';
import { BsDatepickerModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [QualityAuditListComponent],
  imports: [
    CommonModule,
    QualityAuditRoutingModule,
    NgbTypeaheadModule,
    UIModule,
    NgSelectModule,
    NgbDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    // NgbProgressbarModule,
    // NgApexchartsModule,
    Ng2SearchPipeModule,
    UIModule,
    NgbTypeaheadModule,
    NgbModalModule,
    TextMaskModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot()
  ]
})
export class QualityAuditModule {}
