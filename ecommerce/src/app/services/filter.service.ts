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
    return this.http.get('http://localhost:3300/api/admin/category/get');
  }

  getLeaves(): Observable<any> {
    return this.http.get('http://localhost:3300/api/admin/category/get/leaf');
  }

  setSelectedNode(nodes: TreeNode[] | null) {
    this.selectedNodeSource.next(nodes);
  }

}
