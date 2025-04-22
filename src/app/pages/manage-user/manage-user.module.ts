import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageUserRoutingModule } from './manage-user-routing.module';
import { ManageUserListComponent } from './manage-user-list/manage-user-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbTypeaheadModule,
  NgbModalModule,
  NgbTooltipModule,
  NgbPaginationModule
} from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { TextMaskModule } from 'angular2-text-mask';
import { AddUserComponent } from './add-user/add-user.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CoreModule } from 'src/app/core/core.module';
import { ViewUserComponent } from './view-user/view-user.component';

@NgModule({
  declarations: [ManageUserListComponent, AddUserComponent, ViewUserComponent],
  imports: [
    CommonModule,
    ManageUserRoutingModule,
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
export class ManageUserModule {}
