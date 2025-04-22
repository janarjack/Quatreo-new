import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TlMainScreenRoutingModule } from './tl-main-screen-routing.module';
import { TlMainScreenListComponent } from './tl-main-screen-list/tl-main-screen-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbTypeaheadModule,
  NgbModalModule,
  NgbDatepickerModule,
  NgbPagination,
  NgbPaginationModule
} from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { TextMaskModule } from 'angular2-text-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TlFilterScreenComponent } from './tl-filter-screen/tl-filter-screen.component';


@NgModule({
  declarations: [TlMainScreenListComponent, TlFilterScreenComponent],
  imports: [
    CommonModule,
    TlMainScreenRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    UIModule,
    NgbTypeaheadModule,
    NgbModalModule,
    NgbPaginationModule,
    TextMaskModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbDatepickerModule
  ]
})
export class TlMainScreenModule { }
