import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderManagementListComponent } from './order-management-list/order-management-list.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { ViewOrderComponent } from './view-order/view-order.component';

const routes: Routes = [
    {
        path: 'list',
        component: OrderManagementListComponent
    },
    {
        path: 'addorder',
        component: AddOrderComponent
    },
    {
        path: 'vieworder',
        component: ViewOrderComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrderManagementRoutingModule { }
