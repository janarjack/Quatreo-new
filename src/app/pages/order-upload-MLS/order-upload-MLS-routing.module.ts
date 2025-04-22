import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderUploadMLSComponent } from './order-upload-MLS/order-upload-MLS.component';

const routes: Routes = [
    {
        path: 'list',
        component: OrderUploadMLSComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderUploadMLSRoutingModule {}
