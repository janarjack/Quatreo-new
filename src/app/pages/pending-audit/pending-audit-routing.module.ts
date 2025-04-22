import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PendingAuditListComponent } from './pending-audit-list/pending-audit-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: PendingAuditListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingAuditRoutingModule {}
