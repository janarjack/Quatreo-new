import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BulkOrdersListComponent } from './bulk-orders-list/bulk-orders-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/bulk-orders/list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: BulkOrdersListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BulkOrdersRoutingModule {}
