import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TlMainScreenListComponent } from './tl-main-screen-list/tl-main-screen-list.component';
import { TlFilterScreenComponent } from './tl-filter-screen/tl-filter-screen.component';

const routes: Routes = [
  {
    path: 'list',
    component : TlMainScreenListComponent
  },
  {
    path: 'filter',
    component : TlFilterScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TlMainScreenRoutingModule { }
