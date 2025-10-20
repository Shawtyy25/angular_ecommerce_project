import { Component } from '@angular/core';
import {ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {DialogService} from '../../../../services/admin/dialog.service';
import {skip} from 'rxjs';
import {NewProductPopupTemplateComponent} from './new-product-dialog/new-product-dialog.component';

@Component({
  selector: 'app-prod-header',
  imports: [
    ButtonDirective,
    ButtonIcon,
    ButtonLabel,
    IconField,
    InputIcon,
    InputText,
    NewProductPopupTemplateComponent,
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
