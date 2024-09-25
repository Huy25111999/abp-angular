import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { concatMap, finalize, map, tap } from 'rxjs/operators';
import { STORAGE_KEYS } from 'src/app/shared/constants/system.const';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactSupportComponent } from '../contact-support/contact-support.component';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading = false;
  isShowPassword = false;
  formData: FormGroup = this.fb.group({
    userName: [null, Validators.required],
    password: [null, [Validators.required]],
  });
  currentRouter: string = '';
  saveTokenStorage: any;
  isGetCode: boolean = false;
  getFormValue: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private modalService: NgbModal,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.currentRouter = this.location.path();
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.formData.invalid) {
      this.formData.markAllAsTouched();
      return;
    }

    if (this.formData.valid) {
      this.isLoading = true;
      let fValue = this.formData.value;
      this.getFormValue = fValue;
      this.authService.isHadError.next(false);
      this.authService
        .authenticate(this.getFormValue)
        .pipe(
          tap(val => this.authSuccess(val)),
          concatMap(res =>
            this.authService.getAccountInfo(res.access_token, fValue.userName).pipe(
              finalize(() => (this.isLoading = false)),
              map(accountInfo => ({ res, accountInfo }))
            )
          )
        )
        .subscribe(
          ({ res, accountInfo }) => {
            if (accountInfo) {
              localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(accountInfo));
            }
            if (res) {
              this.authService.isAuthenticated$.next(true);
              // this.isGetCode = true;
              localStorage.setItem(STORAGE_KEYS.ROLES, 'ADMIN');
              sessionStorage.setItem(STORAGE_KEYS.ROLES, 'ADMIN');

              if (this.currentRouter.includes('admin')) {
                window.location.href = '/admin';
              } else if (this.currentRouter.includes('member')) {
                window.location.href = '/member';
              }

              this.isLoading = false;
              this.authService.isCaptcha.next(false);
              this.authService.isHadError.next(false);
            }
          },
          (error: any) => {
            this.isLoading = false;
            console.log('error,rr', error);

            if (
              error.error.error_description === 'RequiresTwoFactor' ||
              error.error.error_description === 'Invalid username or password!'
            ) {
              this.isGetCode = true;
            }
            if (this.authService.isCaptcha.getValue()) {
              this.authService.isCaptcha.next(true);
            }
            this.authService.reset();
          }
        );
    }
  }

  authSuccess(token: any, isRememberMe: boolean = false) {
    console.log('token', token, 'currentRouter');
    if (this.currentRouter.includes('admin')) {
      this.saveTokenStorage = {
        ...token,
        role: 'ADMIN',
      };
      this.setStorage(STORAGE_KEYS.TOKEN);
    } else {
      this.saveTokenStorage = {
        ...token,
        role: 'MEMBER',
      };
      this.setStorage(STORAGE_KEYS.TOKEN_MB);
    }
  }

  setStorage(key: any) {
    sessionStorage.setItem(key, JSON.stringify(this.saveTokenStorage));
    localStorage.setItem(key, JSON.stringify(this.saveTokenStorage));
  }

  openModalResetPassword() {
    const title = 'Reset your password';
    const dialogData = {
      title: title,
    };
    const modalRef = this.modalService.open(ForgetPasswordComponent, {
      size: 'lg',
      scrollable: true,
      centered: true,
      backdrop: 'static',
      keyboard: false,
      windowClass: 'my-custom-modal',
    });
    modalRef.componentInstance.dialogData = dialogData;

    modalRef.result.then(
      data => {},
      reason => {
        console.log('reason', reason);
      }
    );
  }

  openModalContactSupport() {
    const title = 'Contact Support';
    const dialogData = {
      title: title,
    };
    const modalRef = this.modalService.open(ContactSupportComponent, {
      size: 'lg',
      scrollable: true,
      centered: true,
      backdrop: 'static',
      keyboard: false,
      windowClass: 'my-custom-modal',
    });
    modalRef.componentInstance.dialogData = dialogData;
  }
}
