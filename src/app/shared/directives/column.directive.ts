import { ContentChild, Directive, EventEmitter, Input, Output } from '@angular/core';
import { CellDirective } from './cell.directive';
import { HeaderDirective } from './header.directive';
import { NzTableSortFn, NzTableSortOrder } from "ng-zorro-antd/table";

export enum COL_DATA_TYPE {
  TEXT,
  NUMBER,
  CURRENCY,
  DATE,
  ICON,
  STT,
  DISPLAY,
  CONNECT,
  CONTROL
}

export type SortOrder = NzTableSortOrder;
export type SortFunc = NzTableSortFn;
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'ngvn-column',
})
export class ColumnDirective {
  @Input() header = '';
  @Input() width = '';
  @Input() align: any;
  @Input() key = '';
  @Input() renderKey = '';
  @Input() dataType = COL_DATA_TYPE.TEXT;
  @Input() sortable = false;
  @Input() sortOrder: SortOrder = null;
  @Input() sortFn: SortFunc | null = null;
  @Output() sortChange = new EventEmitter<{ key: string, order: SortOrder }>();

  @ContentChild(CellDirective, { static: true }) tplCell?: CellDirective;
  @ContentChild(HeaderDirective, { static: true }) tplHeader?: HeaderDirective;

  constructor() { }
}
