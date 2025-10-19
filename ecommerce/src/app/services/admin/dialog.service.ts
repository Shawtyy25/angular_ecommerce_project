import { Injectable } from '@angular/core';
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
  private visibleSubject = new BehaviorSubject<boolean>(false);
  visible$ = this.visibleSubject.asObservable();

  constructor(private http: HttpClient) {}

  show() {
    this.visibleSubject.next(true);
  }

  hide() {
    this.visibleSubject.next(false);
  }

  createNewProduct(product: CreateProductDto): Observable<any> {
    return this.http.post<any>('http://localhost:3300/api/admin/add/product', product);
  }
}
