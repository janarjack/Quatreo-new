import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageRoleListComponent } from './manage-role-list/manage-role-list.component';
import { EditManageRoleComponent } from './edit-manage-role/edit-manage-role.component';

const routes: Routes = [{
  path: 'list',
  component: ManageRoleListComponent
},
{
  path: 'edit',
  component: EditManageRoleComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoleRoutingModule { }
