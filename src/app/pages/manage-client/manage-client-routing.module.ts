import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageClientListComponent } from './manage-client-list/manage-client-list.component';
import { AddClientComponent } from './add-client/add-client.component';

const routes: Routes = [
    {
        path: 'list',
        component: ManageClientListComponent
    },
    {
        path: 'addclient',
        component: AddClientComponent
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManageClientRoutingModule {}
