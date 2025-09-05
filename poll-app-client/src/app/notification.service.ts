import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notification } from '../app/models/notification.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  setNotificationsRead() {
    return this.http.patch<Notification[]>(environment.apiUrl + '/api/notification/', null);
  }

  constructor(private http: HttpClient) { }

  public findByUser() {
    return this.http.get<Notification[]>(environment.apiUrl + '/api/notification')
  }
}
