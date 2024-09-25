import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {}

  uploadFileImage(event) {
    console.log('event', event);
  }
}
