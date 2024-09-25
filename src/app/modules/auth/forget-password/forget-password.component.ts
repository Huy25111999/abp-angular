import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {
  @Input() dialogData;
  isLoading = false;

  formData: FormGroup = this.fb.group({
    userID: [null, Validators.required],
    email: [null, [Validators.required]],
    password: [null, [Validators.required]],
    reTypePassword: [null, [Validators.required]],
  });

  constructor(private fb: FormBuilder, private activeModal: NgbActiveModal) {}
  ngOnInit(): void {}

  get f() {
    return this.formData.controls;
  }

  closeModal() {
    this.activeModal.close('Close click');
  }

  onSave(e) {
    e.preventDefault();
    if (this.formData.invalid) {
      this.formData.markAllAsTouched();
      return;
    }
  }
}
