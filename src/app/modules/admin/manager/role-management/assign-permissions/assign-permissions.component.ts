import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-assign-permissions',
  templateUrl: './assign-permissions.component.html',
  styleUrls: ['./assign-permissions.component.scss'],
})
export class AssignPermissionsComponent implements OnInit {
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
      listuser: this.listRoles,
    };

    console.log('requestrequest', request);

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

  // fake data for table assign role

  listRoles = [
    {
      function: 'Category',
      features: ['View', 'Add', 'Edit'],
      functionChecked: false,
      checkedFeatures: ['Add'],
    },
    {
      function: 'User',
      features: ['Details', 'Delete'],
      functionChecked: false,
      checkedFeatures: ['Delete'],
    },
    {
      function: 'Product',
      features: ['View', 'Add', 'Edit', 'Delete'],
      functionChecked: false,
      checkedFeatures: [],
    },
  ];

  onFunctionChecked(role: any, isChecked: boolean) {
    role.features.forEach(feature => {
      if (isChecked && !role.checkedFeatures.includes(feature)) {
        role.checkedFeatures.push(feature);
      } else if (!isChecked && role.checkedFeatures.includes(feature)) {
        role.checkedFeatures = role.checkedFeatures.filter(item => item !== feature);
      }
    });
  }

  onFeatureChecked(role: any, feature: string, isChecked: boolean) {
    if (!isChecked && role.functionChecked) {
      role.functionChecked = false;
    }
    if (isChecked && role.features.every(f => role.checkedFeatures.includes(f))) {
      role.functionChecked = true;
    }
    if (isChecked && !role.checkedFeatures.includes(feature)) {
      role.checkedFeatures.push(feature);
    } else if (!isChecked && role.checkedFeatures.includes(feature)) {
      role.checkedFeatures = role.checkedFeatures.filter(item => item !== feature);
    }

    console.log('role.target.checked', role);
    // this.checkFunctionChecked(role);
  }

  // checkFunctionChecked(role: any) {
  //   role.functionChecked = role.features.every(feature => role.checkedFeatures.includes(feature));
  // }
}
