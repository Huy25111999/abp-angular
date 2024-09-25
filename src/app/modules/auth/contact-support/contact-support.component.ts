import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contact-support',
  templateUrl: './contact-support.component.html',
  styleUrls: ['./contact-support.component.scss'],
})
export class ContactSupportComponent implements OnInit {
  defaultValue;
  formData: FormGroup = this.fb.group({
    phone: [null, Validators.required],
    email: [null, Validators.required],
    issue: [null, Validators.required],
    other: [null, Validators.required],
  });

  listIssue: any[] = [
    { value: 0, name: 'Other', active: true },
    { value: 1, name: 'Forgot mail', active: true },
    { value: 2, name: 'Forgot UserID', active: true },
  ];

  customSearchFn(term: string, item: any) {
    term = term.toLocaleLowerCase();
    return (
      //   item.code.toLocaleLowerCase().indexOf(term.trim()) > -1 ||
      item.name.toLocaleLowerCase().indexOf(term.trim()) > -1 ||
      item.name.toLocaleLowerCase().includes(term.toLocaleLowerCase().trim())
    );
  }

  constructor(private fb: FormBuilder, private activeModal: NgbActiveModal) {}
  ngOnInit(): void {
    this.defaultValue = 0;
  }

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

    const data = this.formData.getRawValue();
    console.log('value', data);
  }
}
