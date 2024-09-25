import { Directive, TemplateRef } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[appHeader]'
})
export class HeaderDirective {
  constructor(
    public template: TemplateRef<any>
  ) { }

}
