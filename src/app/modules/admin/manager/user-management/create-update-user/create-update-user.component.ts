import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  NgbModal,
  NgbActiveModal,
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDatepickerI18n,
} from '@ng-bootstrap/ng-bootstrap';
import { REGEX_PHONE, REGEX_EMAIL } from 'src/app/shared/constants/pattern.const';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { DestroyService } from 'src/app/service-common/destroy.service';
import { cloneDeep } from 'lodash';
import * as moment from 'moment';
import { CustomDatepickerI18n, I18n } from 'src/app/shared/components/date-picker/datepicker-i18n';

import { autoSlashDateTime } from 'src/app/shared/components/date-picker/date-picker.component';
import {
  CustomAdapter,
  CustomDateParserFormatter,
} from 'src/app/shared/components/date-picker/datepicker-adapter';
import { UserService } from '../../services/user.service';
// export const trimValidator = (control: AbstractControl): ValidationErrors | null => {
//   const value = control.value;

//   if (!value || value === '') return null;

//   if (value.startsWith(' ') || value.endsWith(' ')) {
//     control.setValue(control.value?.trim(), { emitEvent: false, onlySelf: true });
//   }

//   return null;
// };

@Component({
  selector: 'app-create-update-user',
  templateUrl: './create-update-user.component.html',
  styleUrls: ['./create-update-user.component.scss'],
  providers: [
    DestroyService,
    I18n,
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n },
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
})
export class CreateUpdateUserComponent implements OnInit {
  @Input() dialogData: any;
  files: any;
  formData: FormGroup = this.fb.group({
    avatar: [null],
    userId: [null, Validators.required],
    userName: [null, Validators.required],
    phone: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.pattern(REGEX_EMAIL)]],
    status: [null, [Validators.required]],
    role: [null, [Validators.required]],
  });

  selectStatus: any[] = [
    { value: 1, name: 'Kích hoạt', active: true },
    { value: 0, name: 'Không kích hoạt' },
  ];

  customSearchFn(term: string, item: any) {
    term = term.toLocaleLowerCase();
    return (
      //   item.code.toLocaleLowerCase().indexOf(term.trim()) > -1 ||
      item.name.toLocaleLowerCase().indexOf(term.trim()) > -1 ||
      item.name.toLocaleLowerCase().includes(term.toLocaleLowerCase().trim())
    );
  }

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private userService: UserService,
    private destroy: DestroyService
  ) {}

  ngOnInit(): void {
    // const current = new Date();
    // this.maxDate = {
    //   year: current.getFullYear(),
    //   month: current.getMonth() + 1,
    //   day: current.getDate(),
    // };
    // this.onchangeDate();

    if (this.dialogData.id) {
      this.getUserById(this.dialogData.id);
      this.formData.patchValue({
        userId: 2323,
        userName: 'sso',
        phone: '0239094343',
        email: 'sso@gmail.com',
        status: 1,
        role: 2,
      });
    }
  }

  getUserById(id: any) {}

  //Validate form
  get f() {
    return this.formData.controls;
  }

  // displayFieldHasError(field: string) {
  //   return {
  //     'has-error': this.isFieldValid(field),
  //   };
  // }

  isFieldValid(field: string) {
    const valid =
      !this.formData.controls[field].valid &&
      (this.formData.controls[field].dirty || this.formData.controls[field].touched);

    return valid;
  }

  //  close modal
  closeModal() {
    this.activeModal.close('Close click');
  }

  // image --------
  uploadFileImage(event) {
    this.files = event;
    console.log('this.files', this.files);
    this.formData.controls.avatar.setValue(event);
  }

  //Submit form
  onSave(e) {
    e.preventDefault();
    if (this.formData.invalid) {
      this.formData.markAllAsTouched();
      return;
    }

    // this.formData.get('avatar').setValue(this.files);
    const data = this.formData.getRawValue();
    if (this.dialogData.id) {
      this.userService.updateUser(this.dialogData.id, data).subscribe(
        res => {
          if (res.success) {
            //this.activeModal.close('Close click');
          }
        },
        err => {}
      );
    } else {
      this.userService.createUser(data).subscribe(
        res => {
          if (res.success) {
            //  this.activeModal.close('Close click');
          }
        },
        err => {}
      );
    }
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  //--- datepicker---
  // maxDate: any;
  // errorDate: any = '';
  // @ViewChild('issueDate') issueDate: ElementRef;
  // onchangeDate() {
  //   this.formData.controls.issueDate?.valueChanges.subscribe((res: any) => {
  //     const pattern = new RegExp(
  //       /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4})$/
  //     );
  //     if (res) {
  //       if (!pattern.test(res)) {
  //         this.errorDate = 'Ngày cấp định dạng DD/MM/YYYY';
  //       } else {
  //         this.errorDate = '';
  //         let now = new Date();
  //         now.setDate(now.getDate() - 1);
  //         let dateParts = res.split('/');
  //         if (dateParts.length === 1) {
  //           dateParts = res.split('/');
  //         }
  //         if (parseInt(dateParts[1]) == 2) {
  //           if (parseInt(dateParts[0]) > 29) {
  //             this.errorDate = 'Ngày ko tồn tại';
  //             return;
  //           }
  //         } else if (
  //           parseInt(dateParts[1]) == 4 ||
  //           parseInt(dateParts[1]) == 6 ||
  //           parseInt(dateParts[1]) == 8 ||
  //           parseInt(dateParts[1]) == 11 ||
  //           parseInt(dateParts[1]) == 9
  //         ) {
  //           if (parseInt(dateParts[0]) > 30) {
  //             this.errorDate = 'Ngày ko tồn tại';
  //             return;
  //           }
  //         } else {
  //           if (parseInt(dateParts[0]) > 31) {
  //             this.errorDate = 'Ngày ko tồn tại';
  //             return;
  //           }
  //         }

  //         const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
  //         if (dateObject > now) {
  //           this.errorDate = 'Ngày cấp phải nhỏ hơn ngày hiện tại';
  //         } else {
  //           this.errorDate = '';
  //         }
  //       }
  //     } else {
  //       this.errorDate = '';
  //     }
  //   });
  // }

  // autoSlash(event: any) {
  //   event.target.value = autoSlashDateTime(event);
  // }
}
