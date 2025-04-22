import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NgbCollapseModule,
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbTimepickerModule
} from '@ng-bootstrap/ng-bootstrap';
import { ClickOutsideModule } from 'ng-click-outside';
import { CountToDirective } from './count-to.directive';
import { PagetitleComponent } from './pagetitle/pagetitle.component';
import { PortletComponent } from './portlet/portlet.component';
import { PreloaderComponent } from './preloader/preloader.component';
import { SlimscrollDirective } from './slimscroll.directive';

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [
    SlimscrollDirective,
    PreloaderComponent,
    PagetitleComponent,
    PortletComponent,
    CountToDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ClickOutsideModule,
    NgbCollapseModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgbDropdownModule
  ],
  // tslint:disable-next-line: max-line-length
  exports: [
    SlimscrollDirective,
    PreloaderComponent,
    PagetitleComponent,
    PortletComponent,
    CountToDirective
  ]
})
export class UIModule {}
