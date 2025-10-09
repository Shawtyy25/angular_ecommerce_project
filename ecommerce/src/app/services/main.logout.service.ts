import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

interface logoutResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class MainLogoutService {
  private url: string = 'http://localhost:3300/users/logout';
  constructor(private http: HttpClient) { }

  logout(): Observable<logoutResponse> {
    return this.http.post<logoutResponse>(this.url, {});
  }
}
