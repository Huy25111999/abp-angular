import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-create-update-role',
  templateUrl: './create-update-role.component.html',
  styleUrls: ['./create-update-role.component.scss'],
})
export class CreateUpdateRoleComponent implements OnInit {
  @Input() dialogData: any;
  listIds: any = [];
  columns: any[] = [
    { nameColumn: 'User ID', keyColumn: 'id', searchValue: '', isSearch: true },
    { nameColumn: 'User Name', keyColumn: 'userName', searchValue: '', isSearch: true },
    { nameColumn: 'Current Role', keyColumn: 'currentRole', searchValue: '', isSearch: false },
  ];

  listUsers: any[] = [
    { id: 1, userName: 'SSO', currentRole: 'ADMIN' },
    { id: '2', userName: 'SS1', currentRole: 'MEMBER' },
    { id: 3, userName: 'SS2', currentRole: 'ADMIN' },
    { id: 4, userName: 'SSO', currentRole: 'ADMIN' },
    { id: 5, userName: 'SS1', currentRole: 'MEMBER' },
    { id: 6, userName: 'SS2', currentRole: 'ADMIN' },
    { id: 7, userName: 'SSO', currentRole: 'ADMIN' },
  ];

  formData: FormGroup = this.fb.group({
    roleName: [null, Validators.required],
    shortName: [null, [Validators.required]],
  });

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    if (this.dialogData.id) {
      this.getUserById(this.dialogData.id);
      this.formData.patchValue({
        roleName: 'sso',
        shortName: 'AD',
      });
    }
  }
  getUserById(id: any) {}

  //Validate form
  get f() {
    return this.formData.controls;
  }

  closeModal() {
    this.activeModal.close('Close click');
  }

  handleSelectedIds(selectedIds: number[]) {
    console.log('Selected IDs:', selectedIds);
    // Xử lý các ID được chọn ở đây;
    this.listIds = selectedIds;
  }

  onSave(e) {
    e.preventDefault();
    if (this.formData.invalid) {
      this.formData.markAllAsTouched();
      return;
    }

    const data = this.formData.getRawValue();
    const request = {
      ...data,
      listuser: this.listIds,
    };
    if (this.dialogData.id) {
      this.roleService.updateUser(this.dialogData.id, request).subscribe(
        res => {
          if (res.success) {
            this.activeModal.close('Close click');
          }
        },
        err => {}
      );
    } else {
      this.roleService.createUser(request).subscribe(
        res => {
          if (res.success) {
            this.activeModal.close('Close click');
          }
        },
        err => {}
      );
    }
  }
}
