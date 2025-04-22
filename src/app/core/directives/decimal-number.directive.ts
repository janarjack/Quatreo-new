import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';

@Directive({
  selector: '[ktDecimalNumberCharacters]',
})
export class DecimalNumberDirective {
  constructor(private el: ElementRef) {}
  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this.el.nativeElement.value;

    this.el.nativeElement.value = initalValue.replace(/[^0-9.]*/g, '');
    if (initalValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
