import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface newCategoryDto {
  name: string;
  parentId?: number;
  icon?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);

  getCategoryTree() {
    return this.http.get<any>('http://localhost:3300/api/admin/category/get');
  }

  addNewCategory(category: newCategoryDto) {
    return this.http.post('http://localhost:3300/api/admin/category/add', category);
  }
}
