import {Component} from '@angular/core';
import {AdminCardTemplateComponent} from '../../../../beta/admin-card-template/admin-card-template.component';

@Component({
  selector: 'app-admin-products-display',
  imports: [
    AdminCardTemplateComponent,
    AdminCardTemplateComponent
  ],
  templateUrl: './admin-products-display.component.html',
  styleUrl: './admin-products-display.component.scss'
})
export class AdminProductsDisplayComponent {

}
