import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../../services/admin/statistics/statistics.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-order-details',
  imports: [],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
  standalone: true,
})
export class OrderDetailsComponent implements OnInit{
  constructor(private adminService: AdminService, private http: HttpClient) {}
  userCount: number = 0;

  ngOnInit() {
    this.adminService.getUserCount().subscribe(count => this.userCount = count);
  }
}
