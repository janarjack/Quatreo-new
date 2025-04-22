import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageProductListComponent } from './manage-product-list/manage-product-list.component';
import { ManageProductRoutingModule } from './manage-product-routing.module';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ManageProductListComponent],
  imports: [
    CommonModule,
    ManageProductRoutingModule,
    NgbTypeaheadModule,
    UIModule
  ]
})
export class ManageProductModule { }
