import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialCharactersDirective } from '../core/directives/special-characters.directive';
import { PhonePipePipe } from './pipes/phone-pipe.pipe';
import { DecimalNumberDirective } from '../core/directives/decimal-number.directive';

@NgModule({
  declarations: [
    SpecialCharactersDirective,
    PhonePipePipe,
    DecimalNumberDirective,
  ],
  imports: [CommonModule],
  exports: [SpecialCharactersDirective, PhonePipePipe, DecimalNumberDirective],
})
export class CoreModule {}
