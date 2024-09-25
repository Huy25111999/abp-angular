import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, MyProfileComponent],
  imports: [HomeRoutingModule, SharedModule, ReactiveFormsModule, FormsModule, CommonModule],
})
export class HomeModule {}
