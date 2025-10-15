import {Component, OnInit, signal} from '@angular/core';
import { ButtonDirective } from "primeng/button";
import {DataView} from "primeng/dataview";
import {Tag} from "primeng/tag";
import {NgClass} from '@angular/common';
import {SelectButton} from 'primeng/selectbutton';
import {FormsModule} from '@angular/forms';
import {ProductsService} from '../../../../../services/admin/products.service';

export interface Product {
  id: number,
  pName: string,
  pDesc: string | null,
  cName: string,
  icon: string | null,
  pricing: Price,
  attachments: Attachment[]

}

export interface Price {
  price: number,
  validFrom: number,
  validTo: number | null
}

export interface Attachment {
  src: string,
  altText: string,
}




@Component({
  selector: 'app-admin-product-card',
  imports: [
    DataView,
    Tag,
    NgClass,
    SelectButton,
    ButtonDirective,
    FormsModule,
  ],
  templateUrl: './admin-product-card.component.html',
  styleUrl: './admin-product-card.component.scss'
})
export class AdminProductCardComponent implements OnInit{

  constructor(private productService: ProductsService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: value => {
        console.log(value)
        this.products.set(value as Product[]);
      },
      error: err => console.error(err),
    });
  }

  layout: 'list' | 'grid' = 'grid';
  options: string[] = ['list', 'grid'];
  products = signal<Product[] | undefined>(undefined);


}
