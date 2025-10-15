import { Component } from '@angular/core';
import {DialogService} from '../../../services/admin/dialog.service';
import {Dialog} from 'primeng/dialog';

@Component({
  selector: 'app-new-product-popup-template',
  imports: [
    Dialog

  ],
  templateUrl: './new-product-popup-template.component.html',
  styleUrl: './new-product-popup-template.component.scss'
})
export class NewProductPopupTemplateComponent {
  visible: boolean = false;

  constructor(private dialogService: DialogService) {

    this.dialogService.visible$.subscribe(state => this.visible = state);
  }




}
