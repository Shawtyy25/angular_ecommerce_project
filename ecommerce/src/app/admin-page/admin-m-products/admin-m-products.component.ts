import { Component } from '@angular/core';
import {FilterSettingsComponent} from './filter-settings/filter-settings.component';
import {ProdHeaderComponent} from './prod-header/prod-header.component';

@Component({
  selector: 'app-admin-m-products',
  imports: [
    FilterSettingsComponent,
    ProdHeaderComponent
  ],
  templateUrl: './admin-m-products.component.html',
  styleUrl: './admin-m-products.component.scss'
})
export class AdminMProductsComponent {

}
