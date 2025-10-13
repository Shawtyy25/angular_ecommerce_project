import { Component } from '@angular/core';
import {FilterSettingsComponent} from './filter-settings/filter-settings.component';
import {ProdHeaderComponent} from './prod-header/prod-header.component';
import {AdminProductsDisplayComponent} from './admin-products-display/admin-products-display.component';

@Component({
  selector: 'app-admin-m-products',
  imports: [
    FilterSettingsComponent,
    ProdHeaderComponent,
    AdminProductsDisplayComponent
  ],
  templateUrl: './admin-m-products.component.html',
  styleUrl: './admin-m-products.component.scss'
})
export class AdminMProductsComponent {

}
