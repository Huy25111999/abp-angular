import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DestroyService } from 'src/app/service-common/destroy.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { OrdersComponent } from './orders/orders.component';
import { ManagerRoutingModule } from './manager-routing.module';
import { UserManagementComponent } from './user-management/user-management.component';
import { CreateUpdateUserComponent } from './user-management/create-update-user/create-update-user.component';
import { RoleManagementComponent } from './role-management/role-management.component';
import { CreateUpdateRoleComponent } from './role-management/create-update-role/create-update-role.component';
import { AssignPermissionsComponent } from './role-management/assign-permissions/assign-permissions.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { CreateUpdateAccountComponent } from './account-management/create-update-account/create-update-account.component';
import {
  NgbDropdownModule,
  NgbNavModule,
  NgbModalModule,
  NgbPaginationModule,
  NgbTypeaheadModule,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    UserManagementComponent,
    CreateUpdateUserComponent,
    RoleManagementComponent,
    CreateUpdateRoleComponent,
    AssignPermissionsComponent,
    OrdersComponent,
    AccountManagementComponent,
    CreateUpdateAccountComponent,
  ],
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
