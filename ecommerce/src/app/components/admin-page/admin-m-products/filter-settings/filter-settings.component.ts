import {Component, EventEmitter, OnInit, Output, Signal, signal} from '@angular/core';
import {Tree} from 'primeng/tree';
import {TreeNode} from 'primeng/api';
import {FilterService} from '../../../../services/filter.service';

interface CategoryNode {
  id: number,
  name: string,
  icon?: string,
  children?: CategoryNode[]
}

@Component({
  selector: 'app-filter-settings',
  imports: [
    Tree
  ],
  templateUrl: './filter-settings.component.html',
  styleUrl: './filter-settings.component.scss',
  standalone: true,

})
export class FilterSettingsComponent implements OnInit {
  constructor(private filterService: FilterService) {
  }

  filterData = signal<TreeNode[]>([]);
  selectedNode!: TreeNode[] | null;


  ngOnInit(): void {
    this.filterService.getCategories().subscribe({
      next: (data: CategoryNode[]) => {
        this.filterData.set(data.map(cat => this.mapToTreeNode(cat)));
        console.table(this.filterData())
      },
      error: (err) => console.error(err)
    });

  }

  private mapToTreeNode(category: CategoryNode): TreeNode {
    return {
      label: category.name,
      data: {
        id: category.id
      },
      icon: category.icon,
      children: category.children ? category.children.map(child => this.mapToTreeNode(child)) : []
    }
  }

  clearSelected(): void {
    this.selectedNode = null;
  }

  onNodeSelect(node: TreeNode[] | null) {
    this.filterService.setSelectedNode(node);
  }


}
