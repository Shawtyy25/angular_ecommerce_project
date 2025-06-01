import { Component } from '@angular/core';
import {WebshopMainHeaderComponent} from './webshop-main-header/webshop-main-header.component';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-webshop-main',
  imports: [
    WebshopMainHeaderComponent
  ],
  templateUrl: './webshop-main.component.html',
  styleUrl: './webshop-main.component.scss'
})
export class WebshopMainComponent {
  //TODO
}
