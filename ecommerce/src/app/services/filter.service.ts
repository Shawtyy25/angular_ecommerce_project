import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {TreeNode} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private selectedNodeSource = new BehaviorSubject<TreeNode[] | null>(null);
  selectedNode$ = this.selectedNodeSource.asObservable();

  constructor(private http: HttpClient) {}


  getCategories(): Observable<any> {
    return this.http.get('http://localhost:3300/api/categories');
  }

  makeLeafCategoryArray(categories: any[], state?: 'dropdown') {
    const leaves: any[] = [];

    function filterLeaves(node: any) {
      if (!node.children || node.children.length === 0) {
        leaves.push(node);
        return
      }

      node.children.forEach((child: any) => filterLeaves(child));

    }

    categories.forEach(filterLeaves);

    if (state) {
      const dd_leaves: any[] = leaves.map((node: any) => ({
        id: node.data.id,
        name: node.data.name
      }))

      return dd_leaves;
    }
    return leaves;
  }

  setSelectedNode(nodes: TreeNode[] | null) {
    this.selectedNodeSource.next(nodes);
  }

}
