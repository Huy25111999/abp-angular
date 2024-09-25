import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { concatMap, finalize, map, tap } from 'rxjs/operators';
import { STORAGE_KEYS } from 'src/app/shared/constants/system.const';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  isLoading = false;
  isShowPassword = false;
  formData: FormGroup = this.fb.group({
    email: [null, Validators.required],
    password: [null, [Validators.required]],
    contact: [null, Validators.required],
    otp: [null, Validators.required],
  });
  message: string;

  otp: string;
  showOtpComponent = true;
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '*',
    inputStyles: { width: '50px', height: '50px' },
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}
  ngOnInit(): void {}

  onSubmit(e) {
    e.preventDefault();
    if (this.formData.invalid) {
      this.formData.markAllAsTouched();
      return;
    }

    this.message = '';
    const formValue = this.formData.getRawValue();
    if (!formValue.userName || !formValue.userName.length) {
      this.message = 'Tên đăng nhập không được để trống!';
      return;
    }
    if (!formValue.password || !formValue.password.length) {
      this.message = 'Mật khẩu không được để trống!';
      return;
    }
  }

  onOtpChange(otp: any) {
    console.log('val--', otp);
    // this.otp = otp;
    // if (otp.length == 5) {
    //   this.validateOtp();
    // }

    this.formData.patchValue({
      otp: otp,
    });
  }

  get isOtpEntered(): boolean {
    return this.formData.get('otp').value !== null;
  }

  setVal(val: any) {
    this.ngOtpInput.setValue(val);
  }
  validateOtp() {
    console.log('only allow 4 digit');
  }
}
