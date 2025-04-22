import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeblinksMappingComponent } from './weblinks-mapping/weblinks-mapping.component';
import { AddWeblinksComponent } from './add-weblinks/add-weblinks.component';

const routes: Routes = [
  {
    path: 'list',
    component: WeblinksMappingComponent
  },
  {
    path: 'add',
    component: AddWeblinksComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeblinksMappingRoutingModule { }
