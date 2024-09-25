import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthMemberGuard } from 'src/app/helpers/auth-member.guard';
import { AccountManagementComponent } from './account-management/account-management.component';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthMemberGuard],
  },
  {
    path: 'account',
    component: AccountManagementComponent,
    canActivate: [AuthMemberGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {}
