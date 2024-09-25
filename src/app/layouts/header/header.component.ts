import { Component, OnInit } from '@angular/core';
import { ReplaceableComponentsService } from '@abp/ng.core';
import { LanguageComponent } from '../language/language.component';
import { Router } from '@angular/router';
import { STORAGE_KEYS } from 'src/app/shared/constants/system.const';
import { eThemeLeptonXComponents } from '@volosoft/abp.ng.theme.lepton-x'; // imported eThemeLeptonXComponents enum
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userInfo: any;

  constructor(
    private replaceableComponents: ReplaceableComponentsService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.replaceableComponents.add({
      component: LanguageComponent,
      key: eThemeLeptonXComponents.NavItems,
    });
    const user =
      localStorage.getItem(STORAGE_KEYS.USER_DATA) ||
      sessionStorage.getItem(STORAGE_KEYS.USER_DATA);
    this.userInfo = JSON.parse(user);
  }

  logout() {
    const getCurrentRouter = this.location.path();
    if (getCurrentRouter.includes('admin')) {
      localStorage.removeItem('TOKEN');
      sessionStorage.removeItem('TOKEN');
      this.router.navigate(['/admin/auth/login']);
    } else {
      localStorage.removeItem('TOKEN_MB');
      sessionStorage.removeItem('TOKEN_MB');
      this.router.navigate(['/member/auth/login']);
    }
  }
}
