import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageProductListComponent } from './manage-product-list/manage-product-list.component';

const routes: Routes = [
    {
        path: 'list',
        component: ManageProductListComponent
    }


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManageProductRoutingModule {}
