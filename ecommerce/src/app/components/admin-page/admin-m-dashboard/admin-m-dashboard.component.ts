import { Component } from '@angular/core';
import {OrderDetailsComponent} from './order-details/order-details.component';

@Component({
  selector: 'app-admin-m-dashboard',
  imports: [
    OrderDetailsComponent
  ],
  templateUrl: './admin-m-dashboard.component.html',
  styleUrl: './admin-m-dashboard.component.scss',
})
export class AdminMDashboardComponent {

}
