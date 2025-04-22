import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingAuditRoutingModule } from './pending-audit-routing.module';
import { PendingAuditListComponent } from './pending-audit-list/pending-audit-list.component';
import { UIModule } from 'src/app/shared/ui/ui.module';
import {
  NgbTypeaheadModule,
  NgbModalModule,
  NgbDatepickerModule,
  NgbPaginationModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CoreModule } from 'src/app/core/core.module';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { QualityAuditScreenComponent } from './quality-audit-screen/quality-audit-screen.component';

@NgModule({
  declarations: [PendingAuditListComponent, QualityAuditScreenComponent],
  imports: [
    CommonModule,
    PendingAuditRoutingModule,
    CommonModule,
    // Ng2SearchPipeModule,
    UIModule,
    NgbTypeaheadModule,
    NgbModalModule,
    TextMaskModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbPaginationModule,
    NgSelectModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgbTooltipModule,
    CoreModule,
    BsDatepickerModule.forRoot(),
  ],
  entryComponents: [QualityAuditScreenComponent],
})
export class PendingAuditModule {}
