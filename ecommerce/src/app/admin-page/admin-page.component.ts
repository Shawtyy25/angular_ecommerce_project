import { Component } from '@angular/core';
import {AdminLeftMenuComponent} from './admin-left-menu/admin-left-menu.component';

@Component({
  selector: 'app-admin-page',
  imports: [
    AdminLeftMenuComponent
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss'
})
export class AdminPageComponent {

}
