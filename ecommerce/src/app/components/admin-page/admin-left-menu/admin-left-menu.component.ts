import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-admin-left-menu',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './admin-left-menu.component.html',
  styleUrl: './admin-left-menu.component.scss'
})
export class AdminLeftMenuComponent {

}
