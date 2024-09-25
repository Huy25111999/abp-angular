import { Router } from '@angular/router';
import { Injectable, OnDestroy } from '@angular/core';
import { STORAGE_KEYS } from '../constants/system.const';
//import jwt_decode from "jwt-decode";
import { interval, Subscription, timeInterval, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthUtilsService implements OnDestroy {
  userData: any = null
  isAuthenticated$ = new BehaviorSubject(false);
  token: any
  roles: string[] = []
  language: string = ''
  clearInterval: Subscription = new Subscription();

  public user$ = new BehaviorSubject<Partial<any>>({});

  constructor(
    private router: Router,
  ) {
    this.checkStorage();
  }
  get User() {
    return this.user$.asObservable();
  }
  checkStorage() {
    let user = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    if (this.isUser() && this.isAuthenticated() && user) {
      this.user$.next(JSON.parse(user));
    }
  }
  isUser(): boolean {
    const token = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return Boolean(token);
  }
  isAuthenticated(): boolean {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    return Boolean(token);
  }
  checkAuthenticated(): void {
    let storageData = localStorage.getItem(STORAGE_KEYS.USER_DATA) || sessionStorage.getItem(STORAGE_KEYS.USER_DATA) || null
    let tokenInfo = localStorage.getItem(STORAGE_KEYS.TOKEN) || sessionStorage.getItem(STORAGE_KEYS.TOKEN);
    this.language = localStorage.getItem(STORAGE_KEYS.LANGUAGE) || sessionStorage.getItem(STORAGE_KEYS.LANGUAGE) || ''
    if (storageData) {
      this.userData = JSON.parse(storageData);
    }
    if (tokenInfo) {
      this.token = JSON.parse(tokenInfo);
      this.checkIsExpired();
      // this.clearInterval = interval(15000).subscribe(() => {
      //   this.checkIsExpired()
      // })
      this.isAuthenticated$.next(true);
    } else {
      this.isAuthenticated$.next(false);
      this.router.navigateByUrl('/auth/login');
    }
  }

  /**
  * Description: Check token is expired or not
  */
  checkIsExpired(): void {
    // let decoded: any = jwt_decode(this.token.access_token);
    // let newTime = Math.floor(Date.now() / 1000)
    // if (decoded.exp <= newTime) {
    //   this.router.navigateByUrl('/auth/login')
    // }
  }

  getToken(): string {
    let tokenInfo: any = localStorage.getItem(STORAGE_KEYS.TOKEN) || sessionStorage.getItem(STORAGE_KEYS.TOKEN);
    if (tokenInfo) {
      tokenInfo = JSON.parse(tokenInfo);
      return tokenInfo.access_token;
    }
    return '';
  }
  getRefreshToken(): string {
    let tokenInfo: any = localStorage.getItem(STORAGE_KEYS.TOKEN) || sessionStorage.getItem(STORAGE_KEYS.TOKEN);
    if (tokenInfo) {
      tokenInfo = JSON.parse(tokenInfo);
      return tokenInfo.refresh_token;
    }
    return '';
  }
  saveToken(token: string) {
    if (token && token !== 'null') {
      sessionStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.TOKEN);

      sessionStorage.setItem(STORAGE_KEYS.TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    }
  }
  clearToken() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    sessionStorage.removeItem(STORAGE_KEYS.TOKEN);
  }
  clearLocalStorage() {
    localStorage.removeItem('ROLES');
    localStorage.removeItem('USER_DATA');
    localStorage.removeItem('TOKEN');
  }
  reset() {
    // clear localstorage
    localStorage.clear();
    // clear sectionStorage
    sessionStorage.clear();
  }
  getLanguage(): string {
    let lang: string = localStorage.getItem(STORAGE_KEYS.LANGUAGE) || sessionStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'vi'
    return lang
  }
  getUserData() {
    let userData: any = localStorage.getItem(STORAGE_KEYS.USER_DATA) || sessionStorage.getItem(STORAGE_KEYS.USER_DATA);
    if (userData) {
      userData = JSON.parse(userData);
      return userData.roleName;
    }
    return '';
  }
  checkUserHaveAnyRole(roles: string[]): boolean {
    let result = this.roles.some((authority: string) => roles.includes(authority));
    return result
  }

  ngOnDestroy(): void {
    this.clearInterval.unsubscribe()
  }
}
