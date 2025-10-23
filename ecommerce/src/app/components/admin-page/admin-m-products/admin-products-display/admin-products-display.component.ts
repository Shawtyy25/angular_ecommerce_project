import {Component} from '@angular/core';
import {AdminCardTemplateComponent} from '../../../../beta/admin/admin-card-template/admin-card-template.component';
import {AdminProductCardComponent} from './admin-product-card/admin-product-card.component';

@Component({
  selector: 'app-admin-products-display',
  imports: [
    AdminProductCardComponent
  ],
  templateUrl: './admin-products-display.component.html',
  styleUrl: './admin-products-display.component.scss'
})
export class AdminProductsDisplayComponent {

}
