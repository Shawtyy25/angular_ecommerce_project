import {Component, effect, inject, OnInit} from '@angular/core';
import {DialogService} from '../../../../../services/admin/dialog/dialog.service';
import {Button} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {TreeTableModule} from 'primeng/treetable';
import {TreeNode} from 'primeng/api';
import {CategoryService} from '../../../../../services/admin/new-category/category.service';
import {NgIf} from '@angular/common';

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
  ],
  templateUrl: './new-category-dialog.component.html',
  styleUrl: './new-category-dialog.component.scss'
})
export class NewCategoryDialogComponent implements OnInit {
  private dialogService = inject(DialogService);
  private categoryService = inject(CategoryService);

  categories!: TreeNode[];
  cols!: Column[];
  visible: boolean = false;

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

  onDialogClose() {
    this.dialogService.hideCategory();
  }
}
