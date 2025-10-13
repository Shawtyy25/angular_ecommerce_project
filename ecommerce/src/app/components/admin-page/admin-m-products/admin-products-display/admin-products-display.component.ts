import {Component, signal} from '@angular/core';
import {NgClass} from '@angular/common';
import {Tag} from 'primeng/tag';
import {Button} from 'primeng/button';
import {DataView} from 'primeng/dataview';
import {AdminCardTemplateComponent} from '../../../../beta/admin-card-template/admin-card-template.component';

@Component({
  selector: 'app-admin-products-display',
  imports: [
    NgClass,
    Tag,
    Button,
    DataView,
    AdminCardTemplateComponent
  ],
  templateUrl: './admin-products-display.component.html',
  styleUrl: './admin-products-display.component.scss'
})
export class AdminProductsDisplayComponent {

}
