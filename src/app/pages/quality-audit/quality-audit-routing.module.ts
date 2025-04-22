import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QualityAuditListComponent } from './quality-audit-list/quality-audit-list.component';

const routes: Routes = [
    {
        path: 'list',
        component: QualityAuditListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QualityAuditRoutingModule { }
