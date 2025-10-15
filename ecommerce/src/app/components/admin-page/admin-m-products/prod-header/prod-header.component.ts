import { Component } from '@angular/core';
import {ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {DialogService} from '../../../../services/admin/dialog.service';
import {
  NewProductPopupTemplateComponent
} from '../../../../beta/admin-card-template/new-product-popup-template/new-product-popup-template.component';
import {skip} from 'rxjs';

@Component({
  selector: 'app-prod-header',
  imports: [
    ButtonDirective,
    ButtonIcon,
    ButtonLabel,
    IconField,
    InputIcon,
    InputText,
    NewProductPopupTemplateComponent
  ],
  templateUrl: './prod-header.component.html',
  styleUrl: './prod-header.component.scss'
})
export class ProdHeaderComponent {

  constructor(private dialogService: DialogService) {
    this.dialogService.visible$
      .pipe(skip(1))
      .subscribe(state => this.dialogVisible = state)
  }
  dialogVisible: boolean = false;


  showDialog() {
    this.dialogService.show();
  }


}
