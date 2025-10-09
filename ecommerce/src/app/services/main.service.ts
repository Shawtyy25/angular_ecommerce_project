import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private url: string = "http://localhost:3300/users/current";
  constructor(private http: HttpClient) { }

  getUser(): Observable<any> {
    return this.http.get(this.url);
  }
}
