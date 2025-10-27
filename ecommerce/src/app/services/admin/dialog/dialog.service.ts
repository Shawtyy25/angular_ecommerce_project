import {Injectable, signal} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';


export interface Price {
  price: number;
  validFrom: Date;
  validTo?: null | Date;
}

export interface Attachment {
  src: string;
  alt_text?: string | null;
}

export interface CreateProductDto {
  name: string;
  description: string;
  categoryId: number;
  price: Price;
  attachments: Attachment[];
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  productVisible = signal(false);
  categoryVisible = signal(false);

  constructor(private http: HttpClient) {}

  showProduct() {
    this.productVisible.set(true);
  }

  hideProduct() {
    this.productVisible.set(false);
  }

  showCategory() {
    this.categoryVisible.set(true);
  }

  hideCategory() {
    this.categoryVisible.set(false);
  }

  createNewProduct(product: CreateProductDto): Observable<any> {
    return this.http.post<any>('http://localhost:3300/api/admin/add/product', product);
  }

  createNewCategory() {
    /*return this.http.post<any>('http://localhost:3300/api/admin/add/category');*/ //TODO
  }
}
