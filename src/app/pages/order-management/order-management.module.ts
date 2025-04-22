import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderManagementListComponent } from './order-management-list/order-management-list.component';
import { OrderManagementRoutingModule } from './order-management-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbTypeaheadModule,
  NgbModalModule,
  NgbTabsetModule,
  NgbDatepickerModule,
  NgbPaginationModule,
  NgbTooltipModule
} from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { TextMaskModule } from 'angular2-text-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddOrderComponent } from './add-order/add-order.component';
import { CoreModule } from 'src/app/core/core.module';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { ViewOrderComponent } from './view-order/view-order.component';
@NgModule({
  declarations: [
    OrderManagementListComponent,
    AddOrderComponent,
    ViewOrderComponent
  ],
  imports: [
    CommonModule,
    OrderManagementRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    UIModule,
    NgbTypeaheadModule,
    NgbModalModule,
    NgbPaginationModule,
    TextMaskModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbTabsetModule,
    NgbDatepickerModule,
    CoreModule,
    NgbTooltipModule,

    BsDatepickerModule.forRoot()
  ]
})
export class OrderManagementModule {}
