import { NgModule } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageComponent } from './language/language.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './layout.component';
import { SimplebarAngularModule } from 'simplebar-angular';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [LayoutComponent, LanguageComponent, SidebarComponent, HeaderComponent],
  imports: [CommonModule, RouterModule, SharedModule, SimplebarAngularModule, NgbDropdownModule],
  exports: [NgbDropdownModule, LayoutComponent],
  providers: [AsyncPipe],
})
export class LayoutsModule {}
