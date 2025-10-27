import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);

  getCategoryTree() {
    return this.http.get<any>('http://localhost:3300/api/admin/category/get');
  }
}
