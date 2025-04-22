import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OvertimeScreenListComponent } from './overtime-screen-list/overtime-screen-list.component';
import { AddOvertimeComponent } from './add-overtime/add-overtime.component';

const routes: Routes = [
  {
    path: 'list',
    component: OvertimeScreenListComponent
  },
  {
    path: 'add',
    component: AddOvertimeComponent
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OvertimeScreenRoutingModule { }
