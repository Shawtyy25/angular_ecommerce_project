import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3300/api/login';

  constructor(private http: HttpClient) { }

  loginCheck(username: string, password: string): Observable<any>{
    const data = { username, password }
    return this.http.post(this.apiUrl, data);
  }
}
