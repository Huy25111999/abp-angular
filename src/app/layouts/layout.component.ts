import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '@abp/ng.core';
import { Router, NavigationEnd } from '@angular/router';
import { MENU, MenuItem } from './menu';
import { STORAGE_KEYS } from '../shared/constants/system.const';
import { Location } from '@angular/common';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, AfterViewInit {
  isCollapsed = false;
  menuItems = [];
  currentRoute: string = '';
  roleCurrent: string = '/admin';

  constructor(private router: Router, private location: Location) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }
  ngAfterViewInit() {
    let arrow = document.querySelectorAll<HTMLElement>('.arrow');
    for (let i = 0; i < arrow.length; i++) {
      arrow[i].addEventListener('click', e => {
        let arrowParent = (e.target as HTMLElement).parentElement?.parentElement; //selecting main parent of arrow
        if (arrowParent) arrowParent.classList.toggle('showMenu');
      });
    }
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
    console.log('currentRoute', this.currentRoute);
  }

  ngOnInit(): void {
    //this.menuItems = MENU;

    const getRouter = this.location.path();
    if (getRouter.includes('admin')) {
      // Lấy ra danh sách các item có chứa role là 'ADMIN'
      const adminMenuItems: MenuItem[] = this.filterItemsByRole(MENU, 'ADMIN');
      this.menuItems = adminMenuItems;
      this.roleCurrent = '/admin';
    } else if (getRouter.includes('member')) {
      const adminMenuItems: MenuItem[] = this.filterItemsByRole(MENU, 'MEMBER');
      this.menuItems = adminMenuItems;
      this.roleCurrent = '/member';
    }
  }

  filterItemsByRole(items: MenuItem[], role: string): MenuItem[] {
    const filteredItems: MenuItem[] = [];

    items.forEach(item => {
      if (item.role && item.role.includes(role)) {
        // Nếu mục chính có chứa vai trò 'ADMIN', thêm vào mảng kết quả
        filteredItems.push(item);
      }

      // Nếu mục chính có thuộc tính 'subItems', kiểm tra và lọc các mục con
      if (item.subItems && item.subItems.length > 0) {
        const filteredSubItems = this.filterItemsByRole(item.subItems, role);
        if (filteredSubItems.length > 0) {
          // Nếu có mục con được lọc, thêm vào mục chính với thuộc tính 'subItems' đã được lọc
          filteredItems.push({
            ...item,
            subItems: filteredSubItems,
          });
        }
      }
    });

    return filteredItems;
  }

  hasItems(item: MenuItem) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }

  toggleSubMenu() {
    this.isCollapsed = !this.isCollapsed;
  }
}
