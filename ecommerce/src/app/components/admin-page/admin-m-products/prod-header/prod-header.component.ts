import {Component, inject} from '@angular/core';
import {ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {DialogService} from '../../../../services/admin/dialog/dialog.service';
import {skip} from 'rxjs';
import {NewProductPopupTemplateComponent} from './new-product-dialog/new-product-dialog.component';
import {NewCategoryDialogComponent} from './new-category-dialog/new-category-dialog.component';

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
    NewCategoryDialogComponent,
  ],
  templateUrl: './prod-header.component.html',
  styleUrl: './prod-header.component.scss'
})
export class ProdHeaderComponent {
  private dialogService = inject(DialogService);

  productDialogVisible = this.dialogService.productVisible;
  categoryDialogVisible = this.dialogService.categoryVisible;



  showProductDialog() {
    this.dialogService.showProduct();
  }

  showCategoryDialog() {
   this.dialogService.showCategory();
  }
}
