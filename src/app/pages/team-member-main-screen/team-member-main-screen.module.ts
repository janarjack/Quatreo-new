import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamMemberMainScreenRoutingModule } from './team-member-main-screen-routing.module';
import { TeamMemberMainScreenListComponent } from './team-member-main-screen-list/team-member-main-screen-list.component';
import { UIModule } from 'src/app/shared/ui/ui.module';
import {
  NgbTypeaheadModule,
  NgbModalModule,
  NgbDatepickerModule,
  NgbPaginationModule,
  NgbTooltipModule
} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { TextMaskModule } from 'angular2-text-mask';
import { ViewTeamMemberComponent } from './view-team-member/view-team-member.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [
    TeamMemberMainScreenListComponent,
    OrderDetailsComponent,
    ViewTeamMemberComponent
  ],
  imports: [
    CommonModule,
    TeamMemberMainScreenRoutingModule,
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
    BsDatepickerModule.forRoot()
  ],
  entryComponents: [ViewTeamMemberComponent]
})
export class TeamMemberMainScreenModule {}
