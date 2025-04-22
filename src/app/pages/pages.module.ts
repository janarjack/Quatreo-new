import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NgbDropdownModule,
  NgbTooltipModule
} from '@ng-bootstrap/ng-bootstrap';

import { DashboardsModule } from './dashboards/dashboards.module';

import { PagesRoutingModule } from './pages-routing.module';
import { ManageClientModule } from './manage-client/manage-client.module';
import { ManageSkillModule } from './manage-skill/manage-skill.module';
import { ManageProductModule } from './manage-product/manage-product.module';
import { OrderManagementModule } from './order-management/order-management.module';
import { ActivityLogModule } from './activity-log/activity-log.module';
import { OvertimeScreenModule } from './overtime-screen/overtime-screen.module';
import { PhonePipePipe } from '../core/pipes/phone-pipe.pipe';
import { CoreModule } from '../core/core.module';
import { WeblinksMappingModule } from './weblinks-mapping/weblinks-mapping.module';
import { PendingReviewModule } from './pending-review/pending-review.module';
import { ViewTeamMemberComponent } from './team-member-main-screen/view-team-member/view-team-member.component';
import { TeamMemberMainScreenModule } from './team-member-main-screen/team-member-main-screen.module';
import { PendingAuditModule } from './pending-audit/pending-audit.module';
// import { ChangePasswordModule } from '../layouts/change-password/change-password.module';

@NgModule({
  declarations: [],
  imports: [
    CoreModule,
    CommonModule,
    NgbDropdownModule,
    DashboardsModule,
    PagesRoutingModule,
    ManageClientModule,
    ManageSkillModule,
    ManageProductModule,
    OrderManagementModule,
    OvertimeScreenModule,
    ActivityLogModule,
    WeblinksMappingModule,
    PendingReviewModule,
    TeamMemberMainScreenModule,
    PendingAuditModule
  ]
})
export class PagesModule {}
