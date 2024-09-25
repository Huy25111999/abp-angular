import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'my-profile', component: MyProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
