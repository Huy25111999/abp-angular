import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from './user-management/user-management.component';
import { RoleManagementComponent } from './role-management/role-management.component';
import { AuthGuard } from 'src/app/helpers/auth.guard';
import { OrdersComponent } from './orders/orders.component';
import { AccountManagementComponent } from './account-management/account-management.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../home/home.module').then(m => m.HomeModule),
    // canActivate: [AuthGuard],
  },
  {
    path: 'user',
    component: UserManagementComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'role',
    component: RoleManagementComponent,
    //  canActivate: [AuthGuard],
  },
  {
    path: 'order',
    component: OrdersComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'account',
    component: AccountManagementComponent,
    //canActivate: [AuthGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {}
