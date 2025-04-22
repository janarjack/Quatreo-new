import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';


const routes: Routes = [

    {
        path: 'dashboard',
        component: Dashboard2Component,
        canActivate: [AuthGuard]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
