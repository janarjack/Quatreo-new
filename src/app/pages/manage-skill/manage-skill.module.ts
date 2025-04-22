import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageSkillListComponent } from './manage-skill-list/manage-skill-list.component';
import { ManageSkillRoutingModule } from './manage-skill-routing.module';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from 'src/app/shared/ui/ui.module';

@NgModule({
  declarations: [ManageSkillListComponent],
  imports: [
    CommonModule,
    ManageSkillRoutingModule,
    NgbTypeaheadModule,
    UIModule
  ]
})
export class ManageSkillModule { }
