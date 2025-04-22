import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OvertimeScreenListComponent } from './overtime-screen-list/overtime-screen-list.component';
import { OvertimeScreenRoutingModule } from './overtime-screen-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UIModule } from 'src/app/shared/ui/ui.module';
import {
  NgbTypeaheadModule,
  NgbModalModule,
  NgbTooltipModule,
  NgbPaginationModule
} from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddOvertimeComponent } from './add-overtime/add-overtime.component';
import 'flatpickr/dist/flatpickr.css'; // you may need to adjust the css import depending on your build tool

import { FlatpickrModule } from 'angularx-flatpickr';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [OvertimeScreenListComponent, AddOvertimeComponent],
  imports: [
    CommonModule,
    OvertimeScreenRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    UIModule,
    NgbTypeaheadModule,
    NgbModalModule,
    NgbPaginationModule,
    // TextMaskModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbTooltipModule,
    FlatpickrModule.forRoot(),
    BsDatepickerModule.forRoot(),

    NgxMaterialTimepickerModule
  ]
})
export class OvertimeScreenModule {}
