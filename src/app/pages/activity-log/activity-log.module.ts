import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityLogListComponent } from './activity-log-list/activity-log-list.component';
import { ActivityLogRoutingModule } from './activity-log-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UIModule } from 'src/app/shared/ui/ui.module';
import {
  NgbTypeaheadModule,
  NgbModalModule,
  NgbTooltipModule,
  NgbPaginationModule
} from '@ng-bootstrap/ng-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddActivityLogComponent } from './add-activity-log/add-activity-log.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@NgModule({
  declarations: [ActivityLogListComponent, AddActivityLogComponent],
  imports: [
    CommonModule,
    ActivityLogRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    UIModule,
    NgbTypeaheadModule,
    NgbModalModule,
    NgbPaginationModule,
    TextMaskModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbTooltipModule,
    FlatpickrModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxMaterialTimepickerModule
  ]
})
export class ActivityLogModule {}
