import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { concatMap, finalize, map, tap } from 'rxjs/operators';
import { STORAGE_KEYS } from 'src/app/shared/constants/system.const';
import { ContactSupportComponent } from '../contact-support/contact-support.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-verifyle',
  templateUrl: './verifyle.component.html',
  styleUrls: ['./verifyle.component.scss'],
})
export class VerifyleComponent implements OnInit {
  @Input() dataform;

  isLoading = false;
  isShowPassword = false;
  roleCurrentRouter: string = 'admin';
  formData: FormGroup = this.fb.group({
    code: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.roleCurrentRouter = this.location.path();
    console.log('dataform', this.dataform);
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
      const requestBody = { ...this.dataform, ...fValue };
      //this.router.navigate(['/admin']);

      // if (this.roleCurrentRouter.includes('admin')) {
      //   window.location.href = '/admin';
      // } else if (this.roleCurrentRouter.includes('member')) {
      //   window.location.href = '/member';
      // }

      this.authService.isHadError.next(false);
      this.authService
        .authenticate(requestBody)
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

              localStorage.setItem(STORAGE_KEYS.ROLES, 'ADMIN');
              sessionStorage.setItem(STORAGE_KEYS.ROLES, 'ADMIN');

              this.router.navigate(['/admin']);
              this.isLoading = false;
              this.authService.isCaptcha.next(false);
              this.authService.isHadError.next(false);
            }
          },
          (error: any) => {
            this.isLoading = false;
            if (error.error.code === '411') {
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
    localStorage.clear();
    sessionStorage.clear();
    sessionStorage.setItem(STORAGE_KEYS.TOKEN, JSON.stringify(token));
    localStorage.setItem(STORAGE_KEYS.TOKEN, JSON.stringify(token));
  }

  //---test---
  codeGenerated: boolean = false;
  code: string = '';

  generateCode() {
    // Code generation logic here
    this.code = this.generateRandomCode(); // Thay bằng hàm tạo mã code của bạn
    this.codeGenerated = true;
  }

  generateRandomCode(): string {
    // Logic để tạo mã code ngẫu nhiên
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 10;
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  //modal
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
