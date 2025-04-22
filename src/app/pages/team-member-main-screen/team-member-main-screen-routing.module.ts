import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamMemberMainScreenListComponent } from './team-member-main-screen-list/team-member-main-screen-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ViewTeamMemberComponent } from './view-team-member/view-team-member.component';

const routes: Routes = [
  {
    path: 'list',
    component: TeamMemberMainScreenListComponent
  },
  {
    path: 'order-detail',
    component: OrderDetailsComponent
  },
  {
    path: 'view-detail',
    component: ViewTeamMemberComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamMemberMainScreenRoutingModule { }
