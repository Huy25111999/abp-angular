import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.scss'],
})
export class ErrorMessagesComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
  ngOnchange(): void {}

  @Input() feature = '';
  @Input() control: AbstractControl = new FormControl();
  @Input() controlName: string | undefined = '';
  @Input() controlNameCompare: string | undefined = '';

  @Input() value: any = null;
  @Input() minValue: any = null;
  @Input() remnantControlName: string = '';
  @Input() maxLength: string | number | undefined = 0;
  @Input() showErrorPattern = false;
  @Input() showErrorLng = false;
  @Input() showErrorLat = false;
  @Input() showErrorHotline = false;
  @Input() showErrorLandline = false;
  @Input() showErrorPhone = false;
  @Input() showErrorUsername = false;
  @Input() showPatternErrName = '';
  @Input() codeArea!: string;
  @Input() customMessagePattern = '';

  get getFirstKeyError(): string {
    return this.control && this.control.errors ? Object.keys(this.control.errors)[0] : '';
  }
}
