import { CoreModule } from '@abp/ng.core';
import {
  NgbDropdownModule,
  NgbPaginationModule,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AvatarComponent } from './components/avatar/avatar.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { DateRangePickerComponent } from './components/date-range-picker/date-range-picker.component';
import { ErrorMessagesComponent } from './components/error-messages/error-messages.component';
import { ImportFileComponent } from './components/import-file/import-file.component';
import { TrimDirective } from './directives/trim.directive';
import { PrimaryTableComponent } from './components/primary-table/primary-table.component';

const COMPONENTS = [
  PaginationComponent,
  AvatarComponent,
  DatePickerComponent,
  DateRangePickerComponent,
  ErrorMessagesComponent,
  ImportFileComponent,
  TrimDirective,
  PrimaryTableComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CoreModule,
    ThemeSharedModule,
    NgbDropdownModule,
    NgxValidateCoreModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
  ],
  exports: [CoreModule, ThemeSharedModule, NgbDropdownModule, NgxValidateCoreModule, ...COMPONENTS],
  providers: [],
})
export class SharedModule {}
