import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[trim]',
})
export class TrimDirective {
  @Output() ngModelChange = new EventEmitter();

  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('focusout') onFocusOut() {
    (this.el.nativeElement as HTMLInputElement).value = (
      this.el.nativeElement as HTMLInputElement
    ).value.trim();
    this.ngModelChange.emit(this.el.nativeElement.value);
    this.control.control?.setValue(this.el.nativeElement.value);
  }
}
