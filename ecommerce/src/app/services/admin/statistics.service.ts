import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) { }

  getUserCount(): Observable<any> {
    return this.http.get<{ count: number }>('http://localhost:3300/admin/users/count')
      .pipe(map(res => res.count));
  }
}
