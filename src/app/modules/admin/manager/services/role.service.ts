import { DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, PipeTransform } from '@angular/core';
import { SortDirection } from 'src/app/shared/directives/sortable.directive';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  // readonly SERVER = environment.application.baseUrl;
  readonly SERVER = 'https://js-post-api.herokuapp.com';

  constructor(private http: HttpClient) {}

  getListRole(page, size, data): Observable<any> {
    return this.http.get(`${this.SERVER}/api/products?_page=${page}&_limit=${size}`, data);
  }

  public deleteUser(id: any): Observable<any> {
    return this.http.get(`${this.SERVER}/api/users/delete-user/${id}`);
  }

  public deleteMulUser(body: any): Observable<any> {
    return this.http.post(`${this.SERVER}/api/users/delete-user`, body);
  }

  public createUser(body: any): Observable<any> {
    return this.http.post(`${this.SERVER}/api/admin/users/create-user`, body);
  }

  public updateUser(id: any, body: any): Observable<any> {
    return this.http.post(`${this.SERVER}/api/admin/users/update-user/${id}`, body);
  }

  exportTraffic(body: any): Observable<any> {
    const url = `${this.SERVER}/api/export-user`;
    return this.http.post(url, body, {
      responseType: 'blob',
      observe: 'response',
    });
  }
}
