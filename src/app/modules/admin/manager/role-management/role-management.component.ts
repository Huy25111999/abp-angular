import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateUpdateRoleComponent } from './create-update-role/create-update-role.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, takeUntil } from 'rxjs';
import { PaginationModel } from 'src/app/shared/models/commons/pagination.model';
import { DestroyService } from 'src/app/service-common/destroy.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { AssignPermissionsComponent } from './assign-permissions/assign-permissions.component';
import { RoleService } from '../services/role.service';
import { TABLE_KEYS } from 'src/app/shared/constants/system.const';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss'],
})
export class RoleManagementComponent implements OnInit {
  isLoading: boolean = false;
  pagination: PaginationModel = new PaginationModel();
  listUsers: any[] = [];
  listUsersClone: any[] = [];
  listColumns: any[] = [
    { key: 'id', title: 'Id', searchValue: '', visible: true },
    { key: 'name', title: 'Name', searchValue: '', visible: true },
    { key: 'originalPrice', title: 'OriginalPrice', searchValue: '', visible: true },
    { key: 'salePrice', title: 'SalePrice', searchValue: '', visible: true },
    { key: 'shortDescription', title: 'ShortDescription', searchValue: '', visible: true },
    { key: 'isFreeShip', title: 'IsFreeShip', searchValue: '', visible: true },
    { key: 'createdAt', title: 'CreatedAt', searchValue: '', visible: true },
  ];

  columns: any[] = [
    { nameColumn: 'STT', keyColumn: 'stt', type: 'stt' },
    { nameColumn: 'Id', keyColumn: 'id', searchValue: '', isSearch: true },
    { nameColumn: 'Name', keyColumn: 'name', searchValue: '', isSearch: true },
    { nameColumn: 'OriginalPrice', keyColumn: 'originalPrice', searchValue: '', isSearch: false },
    { nameColumn: 'SalePrice', keyColumn: 'salePrice', searchValue: '', isSearch: true },
    {
      nameColumn: 'ShortDescription',
      keyColumn: 'shortDescription',
      searchValue: '',
      isSearch: true,
      class: 'truncate',
    },
    { nameColumn: 'IsFreeShip', keyColumn: 'isFreeShip', searchValue: '', isSearch: false },
    {
      nameColumn: 'CreatedAt',
      keyColumn: 'createdAt',
      searchValue: '',
      isSearch: false,
      type: 'dateTime',
    },
  ];

  checked = false;
  itemRecord: any = [];
  setOfCheckedId = new Set<any>();

  formData: FormGroup = this.fb.group({
    name: [null, Validators.required],
    email: [null, Validators.required],
    status: [null, Validators.required],
  });

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private roleService: RoleService,
    private destroy: DestroyService
  ) {}

  ngOnInit(): void {
    this.loadDatasource();
  }

  loadDatasource() {
    this.isLoading = true;
    const data = this.formData.getRawValue();
    this.roleService
      .getListRole(this.pagination.pageIndex, this.pagination.pageSize, data)
      .pipe(
        finalize(() => (this.isLoading = false)),
        takeUntil(this.destroy)
      )
      .subscribe(res => {
        this.isLoading = false;
        if (res) {
          this.listUsersClone = res.data;
          this.listUsers = [...this.listUsersClone];
          this.pagination.total = res.pagination._totalRows;
          this.refreshCheckedStatus();
        }
      });
  }

  onPageChange(event: any) {
    this.pagination.pageIndex = event;
    this.loadDatasource();
  }

  pageChangeEvent(event: any) {
    this.pagination.pageIndex = 1;
    this.pagination.pageSize = event;
    this.loadDatasource();
  }

  openModalCreateUpdateRole(id?: number) {
    const title = id ? 'Update role' : 'Create role';
    const dialogData = {
      title: title,
      id: id,
    };
    const modalRef = this.modalService.open(CreateUpdateRoleComponent, {
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

  onDelete(item) {
    Swal.fire({
      text: `Are you sure you want to delete ${item?.name}?`,
      icon: 'warning',
      showCancelButton: true,
      // confirmButtonColor: '#f1416c',
      // cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete!',
      cancelButtonText: 'No, cancel!',
      customClass: {
        confirmButton: 'btn fw-bold btn-danger-submit',
        cancelButton: 'btn fw-bold btn-active-light-primary',
      },
    }).then(result => {
      if (result.value) {
        this.deleteUser(item);
      } else if (result.isConfirmed === false) {
        Swal.fire({
          text: item?.name + ' was not deleted.',
          icon: 'error',
          buttonsStyling: false,
          confirmButtonText: 'Ok, got it!',
          customClass: {
            confirmButton: 'btn fw-bold btn-primary',
          },
        });
      }
    });
  }

  deleteUser(item, mode?: 'single' | 'list') {
    this.roleService.deleteUser(item.id).subscribe(
      res => {
        if (res.success) {
          Swal.fire({
            text: 'You have deleted successfully!',
            icon: 'success',
            buttonsStyling: false,
            confirmButtonText: 'Ok, got it!',
            customClass: {
              confirmButton: 'btn fw-bold btn-primary',
            },
          });
          this.loadDatasource();
        }
      },
      error => {
        Swal.fire({
          text: 'Oops! There are some error(s) detected.',
          icon: 'error',
          buttonsStyling: false,
          confirmButtonText: 'Ok, got it!',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
        });
      }
    );
  }

  // Xử lý checkbox
  onAllChecked(value: boolean): void {
    if (this.listUsers) {
      this.listUsers.forEach(item => this.updateCheckedSet(item?.id, value));
      this.refreshCheckedStatus();
    }
  }

  onItemChecked(id: number, checked: boolean) {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  updateCheckedSet(id: number, checked: boolean) {
    if (checked) {
      this.setOfCheckedId.add(id);
      const getItemFromId = this.listUsers.filter(e => {
        return e.id == id;
      });
      if (getItemFromId) {
        this.itemRecord.push(getItemFromId[0]);
      }
    } else {
      this.setOfCheckedId.delete(id);
      const getItemFromId = this.listUsers.filter(e => {
        return e.id == id;
      });
      if (getItemFromId) {
        this.itemRecord.splice(getItemFromId, 1);
      }
    }
  }

  refreshCheckedStatus() {
    this.checked = this.listUsers.every(item => this.setOfCheckedId.has(item?.id));
  }

  //search table

  search(column): void {
    column.visible = false;
    this.listUsers = this.listUsersClone.filter((item: any) => {
      if (typeof item[column.key] === 'string') {
        return item[column.key].toLowerCase().includes(column.searchValue.trim().toLowerCase());
      } else if (typeof item[column.key] === 'number') {
        const stringValue = column.searchValue.trim().toString();
        return item[column.key].toString().indexOf(stringValue) !== -1;
      }
      return false;
    });
  }

  // delete multi row
  onDeleteMulRole() {
    console.log('getSelectRecord', Array.from(this.setOfCheckedId));
    Swal.fire({
      text: `Are you sure you want to delete user?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete!',
      cancelButtonText: 'No, cancel!',
      customClass: {
        confirmButton: 'btn fw-bold btn-danger-submit',
        cancelButton: 'btn fw-bold btn-active-light-primary',
      },
    }).then(result => {
      if (result.value) {
        const data = Array.from(this.setOfCheckedId);
        this.deleteMulUser(data);
      } else if (result.isConfirmed === false) {
        Swal.fire({
          text: 'item was not deleted.',
          icon: 'error',
          buttonsStyling: false,
          confirmButtonText: 'Ok, got it!',
          customClass: {
            confirmButton: 'btn fw-bold btn-primary',
          },
        });
      }
    });
  }

  deleteMulUser(item, mode?: 'single' | 'list') {
    this.roleService.deleteMulUser(item).subscribe(
      res => {
        if (res.success) {
          Swal.fire({
            text: 'You have deleted successfully!',
            icon: 'success',
            buttonsStyling: false,
            confirmButtonText: 'Ok, got it!',
            customClass: {
              confirmButton: 'btn fw-bold btn-primary',
            },
          });
          this.loadDatasource();
        }
      },
      error => {
        Swal.fire({
          text: 'Oops! There are some error(s) detected.',
          icon: 'error',
          buttonsStyling: false,
          confirmButtonText: 'Ok, got it!',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
        });
      }
    );
  }

  // Assign permission
  onAssignPermissions() {
    const title = 'Assign Permissions';
    const dialogData = {
      title: title,
    };
    const modalRef = this.modalService.open(AssignPermissionsComponent, {
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

  //Use primary-table

  listIds: any = [];
  handleSelectedIds(selectedIds: number[]) {
    this.listIds = selectedIds;
  }

  tableQueryParamsChange(event: string): void {
    this.loadDatasource();
  }
}