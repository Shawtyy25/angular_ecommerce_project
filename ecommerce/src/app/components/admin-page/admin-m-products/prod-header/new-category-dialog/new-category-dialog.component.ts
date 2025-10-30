import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {DialogService} from '../../../../../services/admin/dialog/dialog.service';
import {Button} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {TreeTableModule} from 'primeng/treetable';
import {TreeNode} from 'primeng/api';
import {CategoryService} from '../../../../../services/admin/new-category/category.service';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {IconService} from '../../../../../services/icons/icon.service';
import {Select} from 'primeng/select';


interface Column {
  field: string;
  header: string;
}

interface CategoryNode {
  id: number,
  name: string,
  icon?: string,
  children?: CategoryNode[]
}

@Component({
  selector: 'app-new-category-dialog',
  imports: [
    Dialog,
    TreeTableModule,
    Button,
    FloatLabel,
    InputText,
    FormsModule,
    Select,
  ],
  templateUrl: './new-category-dialog.component.html',
  styleUrl: './new-category-dialog.component.scss'
})
export class NewCategoryDialogComponent implements OnInit {
  private dialogService = inject(DialogService);
  private categoryService = inject(CategoryService);
  private iconService = inject(IconService);

  categories!: TreeNode[];
  cols!: Column[];
  visible: boolean = false;
  selectedCategory = signal<CategoryNode | undefined>(undefined);
  newCategoryName: string | undefined;
  icons = signal<{}[]>([{}]);
  selectedIcon: string | undefined;

  constructor() {
    effect(() => {
      this.visible = this.dialogService.categoryVisible();
    });
  }

  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'action', header: ''}
    ];

    this.getCategoriesFromService();
    this.getIconsFromApi();

  }

  getCategoriesFromService() {
    this.categoryService.getCategoryTree().subscribe({
      next: value => {
        this.categories = this.transformToTreeTable(value);
      },
      error: err => console.error('Error requesting categories from admin site:', err)
    })
  }

  private transformToTreeTable(categories: CategoryNode[]): TreeNode[] {
    return categories.map(cat => ({
      data: {
        id: cat.id,
        name: cat.name,
        icon: cat.icon,
      },
      children: cat.children ? this.transformToTreeTable(cat.children) : [],

    }))
  }

  selectItem(category: CategoryNode) {
    category.id === this.selectedCategory()?.id ? this.selectedCategory.set(undefined) : this.selectedCategory.set(category);

  }

  getIconsFromApi() {
    this.iconService.getAllPrimeIcons().subscribe({
      next: iconList => {
        this.icons.set(iconList.map(icon => ({
          name: icon,
        })));
      },
      error: err => console.error(err)
    })
  }


  onDialogClose() {
    this.dialogService.hideCategory();
  }


}
