import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageSkillListComponent } from './manage-skill-list/manage-skill-list.component';

const routes: Routes = [
    {
        path: 'list',
        component: ManageSkillListComponent
    }


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManageSkillRoutingModule {}
