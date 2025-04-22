import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import {
  NgbModalModule,
  NgbPaginationModule,
  NgbProgressbarModule,
  NgbTooltipModule,
  NgbTypeaheadModule
} from '@ng-bootstrap/ng-bootstrap';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators'; // <-- #2 import module
import { TextMaskModule } from 'angular2-text-mask';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CoreModule } from 'src/app/core/core.module';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { AddClientComponent } from './add-client/add-client.component';
import { ManageClientListComponent } from './manage-client-list/manage-client-list.component';
import { ManageClientRoutingModule } from './manage-client-routing.module';
import { ViewClientComponent } from './view-client/view-client.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AddClientComponent,
    ManageClientListComponent,
    ViewClientComponent
  ],
  imports: [
    CommonModule,
    ManageClientRoutingModule,
    FormsModule,
    FileUploadModule,
    NgbPaginationModule,
    NgbProgressbarModule,
    NgbPaginationModule,
    NgApexchartsModule,
    Ng2SearchPipeModule,
    UIModule,
    NgbTypeaheadModule,
    NgbModalModule,
    TextMaskModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    RxReactiveFormsModule,
    CoreModule,
    NgSelectModule,
  ],
  entryComponents: [AddClientComponent, ViewClientComponent]
})
export class ManageClientModule {}
