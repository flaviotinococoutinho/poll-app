import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/user.model';
import { environment } from '../environments/environment';
//import { User } from './user-registration/user-registration.component';

@Injectable()
export class UserService {

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = environment.apiUrl + '/api/users/';
  }

  public save(user: User) {
    window.sessionStorage.setItem('token', '');
    return this.http.post<User>(this.usersUrl + 'register', user);
  }

  public findAll() {
    return this.http.get<User[]>(this.usersUrl);
  }

  public findCurrentUser() {
    return this.http.get<User>(this.usersUrl + 'curr');
  }

  public delete(id: number) {
    return this.http.delete<User>(this.usersUrl + id);
  }

  public update(id: number, user: User){
    return this.http.put<User>(this.usersUrl + id, user);
  }

  public isLoginCorrect(username: string, password: string) {
    return this.http.post<Observable<boolean>>(environment.apiUrl + '/api/users/login', {
      username: username,
      password: password,
      passwordConfirm: password
    });
  }


}
