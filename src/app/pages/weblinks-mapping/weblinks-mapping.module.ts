import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeblinksMappingRoutingModule } from './weblinks-mapping-routing.module';
import { WeblinksMappingComponent } from './weblinks-mapping/weblinks-mapping.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgbTypeaheadModule, NgbModalModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { CoreModule } from 'src/app/core/core.module';
import { AddWeblinksComponent } from './add-weblinks/add-weblinks.component';

@NgModule({
  declarations: [WeblinksMappingComponent, AddWeblinksComponent],
  imports: [
    CommonModule,
    WeblinksMappingRoutingModule,
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
    CoreModule
  ]
})
export class WeblinksMappingModule { }
