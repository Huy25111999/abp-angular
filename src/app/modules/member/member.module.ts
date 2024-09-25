import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MemberRoutingModule } from './member-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DestroyService } from 'src/app/service-common/destroy.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AuthMemberInterceptor } from 'src/app/helpers/auth-member.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    MemberRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgSelectModule,
    FormsModule,
  ],
  providers: [
    DestroyService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthMemberInterceptor,
      multi: true,
    },
  ],
})
export class MemberModule {}
