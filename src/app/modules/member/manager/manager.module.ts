import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DestroyService } from 'src/app/service-common/destroy.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ManagerRoutingModule } from './manager-routing.module';

import {
  NgbDropdownModule,
  NgbNavModule,
  NgbModalModule,
  NgbPaginationModule,
  NgbTypeaheadModule,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { AccountManagementComponent } from './account-management/account-management.component';
import { CreateUpdateAccountComponent } from './account-management/create-update-account/create-update-account.component';

@NgModule({
  declarations: [AccountManagementComponent, CreateUpdateAccountComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ManagerRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgSelectModule,
    FormsModule,
    NgbDatepickerModule,
    NgbNavModule,
  ],
  providers: [DestroyService],
})
export class ManagerModule {}
