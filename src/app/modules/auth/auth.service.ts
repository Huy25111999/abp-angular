import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { UserService } from '../SSO/service/user.service';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

export interface author {
  username?: string;
  password?: string;
  domainCode?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly SERVER: string = 'https://localhost:44344';
  isAuthenticated$ = new BehaviorSubject(false);
  isHadError = new BehaviorSubject<boolean>(false);
  isCaptcha = new BehaviorSubject(false);
  userData: any = null;
  token: any;
  constructor(private http: HttpClient, private router: Router) {}

  authenticate(requestBody: any): Observable<any> {
    console.log('requestBodyrequestBody', requestBody);
    let body = new HttpParams()
      .set('username', requestBody.userName)
      .set('password', requestBody.password)
      .set('grant_type', 'password')
      .set('scope', 'offline_access InspolOnline')
      .set('client_id', 'InspolOnline_App');

    if (requestBody.code) {
      body = body.set('TwoFactorCode', requestBody.code).set('TwoFactorProvider', 'Email');
    }

    return this.http.post<any>(`${this.SERVER}/connect/token`, body.toString(), {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
    });
  }

  getAccountInfo(token: string, username: string): Observable<any> {
    return this.http.get(`${this.SERVER}/api/identity/users/by-username/` + username, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  }

  checkAuthenticated(): void {
    let storageData =
      localStorage.getItem('USER_DATA') || sessionStorage.getItem('USER_DATA') || null;
    let tokenInfo = localStorage.getItem('TOKEN') || sessionStorage.getItem('TOKEN');
    if (storageData) {
      this.userData = JSON.parse(storageData);
    }
    if (tokenInfo) {
      this.token = JSON.parse(tokenInfo);
      this.isAuthenticated$.next(true);
    } else {
      this.isAuthenticated$.next(false);
      this.router.navigateByUrl('/account/login');
    }
  }

  refreshToken() {
    const token = this.getToken();
    const rftoken = this.getRefreshToken();
    if (!token) {
      this.reset();
      this.router.navigate(['/account/login']);
      return of(null);
    }
    return this.http
      .post(`${this.SERVER}/oauth/token?grant_type=refresh_token&refresh_token=${rftoken}`, null, {
        headers: {
          Authorization: environment.keyAuthorizationBasic,
        },
        observe: 'response',
      })
      .pipe(
        map((data: any) => {
          if (data.status === 200) {
            return data.body;
          }
        })
      );
  }

  getRefreshToken(): string {
    let tokenInfo: any = localStorage.getItem('TOKEN') || sessionStorage.getItem('TOKEN');
    if (tokenInfo) {
      tokenInfo = JSON.parse(tokenInfo);
      return tokenInfo.refresh_token;
    }
    return '';
  }

  getToken(): string {
    let tokenInfo: any = localStorage.getItem('TOKEN') || sessionStorage.getItem('TOKEN');
    if (tokenInfo) {
      tokenInfo = JSON.parse(tokenInfo);
      console.log('tokenInfo', tokenInfo);

      return tokenInfo.access_token;
    }
    return '';
  }

  saveToken(token: string) {
    if (token && token !== 'null') {
      sessionStorage.removeItem('TOKEN');
      localStorage.removeItem('TOKEN');

      sessionStorage.setItem('TOKEN', token);
      localStorage.setItem('TOKEN', token);
    }
  }

  getTokenMember(): string {
    let tokenInfo: any = localStorage.getItem('TOKEN_MB') || sessionStorage.getItem('TOKEN_MB');
    if (tokenInfo) {
      tokenInfo = JSON.parse(tokenInfo);
      return tokenInfo.access_token;
    }
    return '';
  }

  saveTokenMember(token: string) {
    if (token && token !== 'null') {
      sessionStorage.removeItem('TOKEN_MB');
      localStorage.removeItem('TOKEN_MB');

      sessionStorage.setItem('TOKEN_MB', token);
      localStorage.setItem('TOKEN_MB', token);
    }
  }

  reset() {
    localStorage.clear();
    sessionStorage.clear();
  }
}
