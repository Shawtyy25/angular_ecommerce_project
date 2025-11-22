import {Component, Input, OnChanges, OnInit, signal, SimpleChanges} from '@angular/core';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';

interface CategoryNode {
  id: number,
  name: string,
  icon?: string,
  parent?: CategoryNode | null,
}

@Component({
  selector: 'app-modify-category',
  imports: [
    FloatLabel,
    InputText,
    FormsModule
  ],
  templateUrl: './modify-category.component.html',
  styleUrl: './modify-category.component.scss',
})
export class ModifyCategoryComponent implements OnChanges{
  @Input() category: CategoryNode | undefined;
  @Input() selectedParentCategory: CategoryNode | undefined;

  categoryName: string | undefined = undefined;
  categoryIcon: string | undefined = undefined;
  parentCategory: string | null = null;

  ngOnChanges(changes: SimpleChanges) {
    this.categoryName = this.category?.name;
    this.categoryIcon = this.category?.icon;
    this.parentCategory = this.selectedParentCategory?.name ?? null;


  }


}
