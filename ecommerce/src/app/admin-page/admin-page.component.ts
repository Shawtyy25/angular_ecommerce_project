import {Component, Input, OnInit} from '@angular/core';
import {AdminLeftMenuComponent} from './admin-left-menu/admin-left-menu.component';
import {AdminHeaderComponent} from './admin-header/admin-header.component';
import {AdminMainComponent} from './admin-main/admin-main.component';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-admin-page',
  imports: [
    AdminLeftMenuComponent,
    AdminHeaderComponent,
    AdminMainComponent
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
  standalone: true,
})
export class AdminPageComponent implements OnInit{
  constructor(private authService: AuthService) {}

  a_user: string | null = null;

  ngOnInit() {

    this.a_user = this.authService.getAdminUser();
    console.log(this.a_user)
  }
}
