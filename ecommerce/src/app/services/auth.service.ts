import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

interface UserData {
  name: string,
  email: string,
  password: string,
  admin: boolean,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3300/api/login';
  private user: UserData | null = null;

  constructor(private http: HttpClient) { }

   loginCheck(username: string, password: string): Observable<any>{
    const data = { username, password }
    return this.http.post(this.apiUrl, data);
  }

  setUser(loggedInUser: UserData): void {
    this.user = loggedInUser;
  }

  isAdmin(): boolean {
    return !!this.user?.admin;
  }

}
