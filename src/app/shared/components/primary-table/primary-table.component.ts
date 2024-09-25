import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TABLE_KEYS } from '../../constants/system.const';

@Component({
  selector: 'app-primary-table',
  templateUrl: './primary-table.component.html',
  styleUrls: ['./primary-table.component.scss'],
})
export class PrimaryTableComponent implements OnInit, AfterViewInit {
  @Input() columns;
  @Input() listData;
  @Input() setCheckedId;
  @Input() pagination;
  @Output() selectedIds: EventEmitter<number[]> = new EventEmitter<number[]>();

  checked = false;
  itemRecord: any = [];
  setOfCheckedId = new Set<any>();

  listDataClone: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.listDataClone = [...this.listData];
  }
  ngAfterViewInit(): void {}

  // Xử lý checkbox
  onAllChecked(value: boolean): void {
    if (this.listData) {
      this.listData.forEach(item => this.updateCheckedSet(item?.id, value));
      this.refreshCheckedStatus();
    }
  }

  onItemChecked(id: any, checked: boolean) {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  updateCheckedSet(id: any, checked: boolean) {
    if (checked) {
      this.setOfCheckedId.add(id);
      const getItemFromId = this.listData.filter(e => {
        return e.id == id;
      });
      if (getItemFromId) {
        this.itemRecord.push(getItemFromId[0]);
      }
    } else {
      this.setOfCheckedId.delete(id);
      const getItemFromId = this.listData.filter(e => {
        return e.id == id;
      });
      if (getItemFromId) {
        this.itemRecord.splice(getItemFromId, 1);
      }
    }
    this.emitSelectedIds();
  }

  refreshCheckedStatus() {
    this.checked = this.listData.every(item => this.setOfCheckedId.has(item?.id));
  }

  emitSelectedIds() {
    this.selectedIds.emit(Array.from(this.setOfCheckedId));
  }

  // Xử lý search column
  search(column): void {
    this.listData = this.listDataClone.filter((item: any) => {
      if (typeof item[column.keyColumn] === 'string') {
        return item[column.keyColumn]
          .toLowerCase()
          .includes(column.searchValue.trim().toLowerCase());
      } else if (typeof item[column.keyColumn] === 'number') {
        const stringValue = column.searchValue.trim().toString();
        return item[column.keyColumn].toString().indexOf(stringValue) !== -1;
      }
      return false;
    });
  }
}
