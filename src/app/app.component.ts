import { ReplaceableComponentsService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from './layouts/layout.component';
import { eThemeLeptonXComponents } from '@volosoft/abp.ng.theme.lepton-x'; // imported eThemeLeptonXComponents enum

@Component({
  selector: 'app-root',
  template: `
    <abp-loader-bar></abp-loader-bar>
    <abp-dynamic-layout></abp-dynamic-layout>
  `,
})
export class AppComponent implements OnInit {
  constructor(
    private replace: ReplaceableComponentsService // injected the service
  ) {}

  ngOnInit(): void {
    this.replace.add({
      component: LayoutComponent,
      key: eThemeLeptonXComponents.ApplicationLayout,
    });
  }
}
