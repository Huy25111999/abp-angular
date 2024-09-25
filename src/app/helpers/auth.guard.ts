import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthUtilsService } from '../shared/utilities/auth.utils.service';
import { STORAGE_KEYS } from '../shared/constants/system.const';
//import { STORAGE_KEYS } from '../shared/constants/system.const';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authUtilsService: AuthUtilsService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let storageData: any =
      localStorage.getItem(STORAGE_KEYS.USER_DATA) ||
      sessionStorage.getItem(STORAGE_KEYS.USER_DATA);
    let token: any =
      localStorage.getItem(STORAGE_KEYS.TOKEN) || sessionStorage.getItem(STORAGE_KEYS.TOKEN);
    // let role: any =
    //   localStorage.getItem(STORAGE_KEYS.ROLES) || sessionStorage.getItem(STORAGE_KEYS.ROLES);

    if (token && storageData) {
      this.authUtilsService.isAuthenticated$.next(true);
      return true;
    }
    this.router.navigate([`admin/auth/login`]);
    return false;
  }
}
