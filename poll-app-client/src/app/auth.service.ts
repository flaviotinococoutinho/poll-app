import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = environment.apiUrl + '/api/user/admin';
  }

  public getToken(): string {
    return window.sessionStorage.getItem('token');
  }

  public isAuthenticated() {
    return this.getToken() !== null && this.getToken() !== '';
  }

  public hasAdminRole() {
    return localStorage.getItem('adminRole') !== null && window.sessionStorage.getItem('adminRole') === 'true';
  }

  public fetchAdminRole() {
    this.http.get<boolean>(this.url).subscribe(res => window.sessionStorage.setItem('adminRole', String(res)));
  }

  public getUsername(){
    return window.sessionStorage.getItem('username');
  }

}
