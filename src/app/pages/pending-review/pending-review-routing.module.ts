import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PendingForReviewComponent } from './pending-for-review/pending-for-review.component';

const routes: Routes = [
  {
    path: 'list',
    component: PendingForReviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingReviewRoutingModule {}
