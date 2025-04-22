import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ClickOutsideModule } from 'ng-click-outside';

import { UIModule } from '../shared/ui/ui.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LayoutsRoutingModule } from './layouts-routing.module';
import { ChangeRoleComponent } from './change-role/change-role.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [LayoutComponent, SidebarComponent, TopbarComponent, FooterComponent, ChangeRoleComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgbDropdownModule,
    ClickOutsideModule,
    UIModule,
    NgbModalModule,
    NgSelectModule,
    ReactiveFormsModule,
    LayoutsRoutingModule,
    FormsModule
  ],
  entryComponents: [ChangePasswordComponent, ChangeRoleComponent]
})
export class LayoutsModule { }
