import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get('http://localhost:3300/api/categories');
  }
}
