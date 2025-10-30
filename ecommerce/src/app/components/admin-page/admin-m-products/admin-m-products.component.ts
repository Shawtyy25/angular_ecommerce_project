import { Component } from '@angular/core';
import {FilterSettingsComponent} from './filter-settings/filter-settings.component';
import {ProdHeaderComponent} from './prod-header/prod-header.component';
import {AdminProductsDisplayComponent} from './admin-products-display/admin-products-display.component';
import {FormsModule} from '@angular/forms';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-admin-m-products',
  imports: [
    FilterSettingsComponent,
    ProdHeaderComponent,
    AdminProductsDisplayComponent,
    FormsModule,
  ],
  templateUrl: './admin-m-products.component.html',
  styleUrl: './admin-m-products.component.scss'
})
export class AdminMProductsComponent {

}
