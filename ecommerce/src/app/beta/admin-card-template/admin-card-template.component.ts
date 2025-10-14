import {Component, OnInit, signal} from '@angular/core';
import {Button, ButtonDirective} from "primeng/button";
import {DataView} from "primeng/dataview";
import {Tag} from "primeng/tag";
import {NgClass} from '@angular/common';
import {PrimeTemplate} from 'primeng/api';
import {SelectButton} from 'primeng/selectbutton';
import {FormsModule} from '@angular/forms';
import {ProductsService} from '../../services/admin/products.service';

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
  selector: 'app-admin-card-template',
  imports: [
    DataView,
    Tag,
    NgClass,
    SelectButton,
    ButtonDirective,
    FormsModule,
  ],
  templateUrl: './admin-card-template.component.html',
  styleUrl: './admin-card-template.component.scss'
})
export class AdminCardTemplateComponent implements OnInit{

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



  getSeverity(product: any) {
    switch (product.inventoryStatus) {
      case 'INSTOCK':
        return 'success';

      case 'LOWSTOCK':
        return 'warn';

      case 'OUTOFSTOCK':
        return 'danger';

      default:
        return null;
    }
  }

}






/*
* products = signal<any>([
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 0,
      inventoryStatus: 'OUTOFSTOCK',
      rating: 5
    },
    {
      id: '1001',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: '1002',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: '1003',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: '1004',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: '1005',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: '1006',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: '1007',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: '1008',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: '1009',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: '1010',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
  ]);*/
