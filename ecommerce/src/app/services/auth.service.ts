import { Injectable,  } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3300/api/user/login';

  constructor(private http: HttpClient) { }

   loginCheck(username: string, password: string): Observable<any>{
    const data = { username, password }
    return this.http.post(this.apiUrl, data);
  }

  setUser(loggedInUser: Array<string | boolean>): void {
    localStorage.setItem('user', JSON.stringify(loggedInUser));
  }

  isAdmin2(): boolean {
    const user: string | null = localStorage.getItem('user');

    if (user) {
      return (JSON.parse(user))[1];
    }

    return false;
  }

  deleteUser(): void {
    localStorage.removeItem('user');
  }

  userAvailable(): boolean {
    const user: string | null = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }

    return false;
  }

  getAdminUser(): string | null {
    const user: string | null = localStorage.getItem('user');
    if (user) {
      return (JSON.parse(user))[0];
    }
    return null;
  }
}
