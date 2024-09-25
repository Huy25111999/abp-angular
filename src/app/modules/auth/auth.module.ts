import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { DestroyService } from 'src/app/service-common/destroy.service';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { VerifyleComponent } from './verifyle/verifyle.component';
import { ContactSupportComponent } from './contact-support/contact-support.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    ContactSupportComponent,
    VerifyleComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgOtpInputModule,
    NgSelectModule,
  ],
  providers: [DestroyService],
})
export class AuthModule {}
