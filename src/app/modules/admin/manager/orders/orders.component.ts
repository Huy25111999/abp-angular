import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { OrderSortableService, SortEvent } from './orders-sortable.directive';

import { OrderService } from './orders.service';
import { Orders } from './orders.model';
import { ordersData } from './data';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [OrderService, DecimalPipe],
})
export class OrdersComponent implements OnInit {
  // breadcrumb items
  breadCrumbItems: Array<{}>;

  ordersData: Orders[];

  orders$: Observable<Orders[]>;
  total$: Observable<number>;
  model: NgbDateStruct;
  @ViewChildren(OrderSortableService) headers: QueryList<OrderSortableService>;

  constructor(public service: OrderService) {
    this.orders$ = service.orders$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Crypto' }, { label: 'Orders', active: true }];

    this.ordersData = ordersData;
  }

  /**
   * Sort table data
   * @param param0 sort the column
   *
   */

  // onSort({ column, direction }: SortEvent) {
  //   this.headers.forEach(header => {
  //     if (header.sortable !== column) {
  //       header.direction = '';
  //     }
  //   });
  //   this.service.sortColumn = column;
  //   this.service.sortDirection = direction;
  // }

  sortBy: string = '';
  sortOrder: string = 'asc'; // hoặc 'desc'

  // Hàm xử lý sự kiện sắp xếp
  onSort(column: string) {
    if (this.sortBy === column) {
      // Đảo chiều sắp xếp nếu cùng một cột được click nhiều lần
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      // Sắp xếp theo cột mới và đặt lại chiều sắp xếp mặc định
      this.sortBy = column;
      this.sortOrder = 'asc';
    }

    console.log('column', column);
    console.log('sortOrder', this.sortOrder);

    // Thực hiện logic sắp xếp dữ liệu ở đây, có thể gọi một hàm hoặc sử dụng một service
  }
}
