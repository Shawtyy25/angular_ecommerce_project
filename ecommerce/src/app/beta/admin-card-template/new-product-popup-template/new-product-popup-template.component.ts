import {Component, signal} from '@angular/core';
import {DialogService} from '../../../services/admin/dialog.service';
import {Dialog} from 'primeng/dialog';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-new-product-popup-template',
  imports: [
    Dialog,
    FloatLabel,
    InputText,
    FormsModule,
  ],
  templateUrl: './new-product-popup-template.component.html',
  styleUrl: './new-product-popup-template.component.scss'
})
export class NewProductPopupTemplateComponent {
  constructor(private dialogService: DialogService) {
    this.dialogService.visible$.subscribe(state => this.visible = state);

  }

  visible: boolean = false;

  productName: string = '';

}
