import {Component, OnInit, signal} from '@angular/core';
import { ButtonDirective } from "primeng/button";
import {DataView} from "primeng/dataview";
import {Tag} from "primeng/tag";
import {DecimalPipe, NgClass} from '@angular/common';
import {SelectButton} from 'primeng/selectbutton';
import {FormsModule} from '@angular/forms';
import {ProductsService} from '../../../../../services/admin/new-product/products.service';
import {FilterService} from '../../../../../services/filter.service';
import {TreeNode} from 'primeng/api';
import {filter} from 'rxjs';

export interface Product {
  id: number,
  name: string,
  description: string | null,
  category: Category
  icon: string | null,
  pricing: Price,
  attachments: Attachment[]

}

export interface Category {
  id: number,
  name: string,
  icon?: string,
  parent?: Category

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
  layout: 'list' | 'grid' = 'grid';
  options: string[] = ['list', 'grid'];
  products = signal<Product[] | undefined>(undefined);
  selectedFilters: TreeNode[] | null = null;

  constructor(private productService: ProductsService, private filterService: FilterService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: value => {

        this.products.set(value as Product[]);
        console.log(this.products());
      },
      error: err => console.error(err),
    });

    this.filterService.selectedNode$.subscribe(nodes => {
      this.selectedFilters = nodes;
    })
  }



  // Ár formázása pl: 12433 - 12 433 format: 'hu-HU' | 'us-US'
  formatPrice(price: number, format: string = 'hu-HU' ) {
    return new Intl.NumberFormat(format).format(price);
    /*.replace(/\s/g, ' ')*/
  }

  filterCards() {
    if (!this.selectedFilters || this.selectedFilters.length === 0) {
      return this.products();
    }

     return this.products()?.filter(product => {
        return this.selectedFilters?.some(filterNode => {
          let currentCategory: Category | undefined = product.category;
          while (currentCategory) {
            if (currentCategory.id === filterNode.data.id) return true;

            currentCategory = currentCategory.parent;
          }
          return false;
        })
     }

    )

  }

}
