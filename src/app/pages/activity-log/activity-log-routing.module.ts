import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivityLogListComponent } from './activity-log-list/activity-log-list.component';
import { AddActivityLogComponent } from './add-activity-log/add-activity-log.component';

const routes: Routes = [
  {
    path: 'list',
    component: ActivityLogListComponent
  },
  {
    path: 'add',
    component: AddActivityLogComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityLogRoutingModule { }
