import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageRoleRoutingModule } from './manage-role-routing.module';
import { ManageRoleListComponent } from './manage-role-list/manage-role-list.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UIModule } from 'src/app/shared/ui/ui.module';
import {
    NgbTypeaheadModule,
    NgbModalModule,
    NgbDropdownModule,
    NgbTabsetModule,
    NgbAccordionModule,
    NgbCollapseModule,
    NgbProgressbarModule,
    NgbAlertModule,
    NgbToastModule,
    NgbPopoverModule,
    NgbTooltipModule,
    NgbPaginationModule, NgbCarouselModule
} from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TextMaskModule } from 'angular2-text-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { EditManageRoleComponent } from './edit-manage-role/edit-manage-role.component';

@NgModule({
    declarations: [ManageRoleListComponent, EditManageRoleComponent],
    imports: [
        CommonModule,
        ManageRoleRoutingModule,
        Ng2SearchPipeModule,
        UIModule,
        NgbTypeaheadModule,
        NgbModalModule,
        TextMaskModule,
        ReactiveFormsModule,
        NgSelectModule,

        NgbDropdownModule,
        NgbTabsetModule,
        NgbAccordionModule,
        NgbCollapseModule,
        NgbModalModule,
        NgbProgressbarModule,
        NgbAlertModule,
        NgbToastModule,
        NgbPopoverModule,
        NgbTooltipModule,
        NgbPaginationModule,
        NgbCarouselModule
    ],

})
export class ManageRoleModule { }
