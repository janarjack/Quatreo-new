import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingReviewRoutingModule } from './pending-review-routing.module';
import { PendingForReviewComponent } from './pending-for-review/pending-for-review.component';
import { ReviewOrderComponent } from './review-order/review-order.component';
import {
  NgbTypeaheadModule,
  NgbModalModule,
  NgbDatepickerModule,
  NgbPaginationModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { TextMaskModule } from 'angular2-text-mask';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CoreModule } from 'src/app/core/core.module';
import { ViewTeamMemberComponent } from '../team-member-main-screen/view-team-member/view-team-member.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { MarkAsCompletedComponent } from './mark-as-completed/mark-as-completed.component';

@NgModule({
  declarations: [
    PendingForReviewComponent,
    ReviewOrderComponent,
    MarkAsCompletedComponent,
  ],
  imports: [
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
    PendingReviewRoutingModule,
    BsDatepickerModule.forRoot(),
  ],
  entryComponents: [ReviewOrderComponent, MarkAsCompletedComponent],
})
export class PendingReviewModule {}
