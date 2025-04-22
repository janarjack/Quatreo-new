import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageUserListComponent } from './manage-user-list/manage-user-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ViewUserComponent } from './view-user/view-user.component';

const routes: Routes = [
  {
    path: 'list',
    component: ManageUserListComponent
  },
  {
    path: 'adduser',
    component: AddUserComponent
  },
  {
    path: 'viewuser',
    component: ViewUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageUserRoutingModule { }
