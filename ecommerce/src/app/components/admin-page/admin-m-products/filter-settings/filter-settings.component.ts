import {Component, EventEmitter, OnInit, Output, Signal, signal} from '@angular/core';
import { Tree } from 'primeng/tree';
import { TreeNode } from 'primeng/api';
import {FilterService} from '../../../../services/filter.service';


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
  constructor(private filterService: FilterService) {}
  filterData = signal<any[]>([]);
  selectedNode!: TreeNode[] | null;


    ngOnInit(): void {
      this.filterService.getCategories().subscribe({
        next: (data) => {
          this.filterData.set(data);
        },
        error: (err) => console.error(err)
      });

    }

    clearSelected(): void {
      this.selectedNode = null;
    }

    onNodeSelect(node: TreeNode[] | null) {
      this.filterService.setSelectedNode(node);
    }


}
