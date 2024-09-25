import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Input,
  OnChanges,
} from '@angular/core';
import { MetisMenu } from 'metismenujs';
import { Router, NavigationEnd } from '@angular/router';

import { HttpClient } from '@angular/common/http';

import { MENU, MenuItem } from './menu';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})

/**
 * Sidebar component
 */
export class SidebarComponent implements OnInit, AfterViewInit {
  isCollapsed = false;
  menuItems = [];
  currentRoute: string;

  constructor(private router: Router) {
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
  }

  ngOnInit(): void {
    this.menuItems = MENU;
  }

  toggleSubMenu() {
    this.isCollapsed = !this.isCollapsed;
  }

  hasItems(item: MenuItem) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }
}
