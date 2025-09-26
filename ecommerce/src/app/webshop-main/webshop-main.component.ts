import {Component, Input, OnInit} from '@angular/core';
import {WebshopMainHeaderComponent} from './webshop-main-header/webshop-main-header.component';

import {MainService} from '../services/main.service';
import {catchError} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-webshop-main',
  imports: [
    WebshopMainHeaderComponent
  ],
  templateUrl: './webshop-main.component.html',
  styleUrl: './webshop-main.component.scss'
})
export class WebshopMainComponent implements OnInit{
  //TODO
  constructor(
    private mainService: MainService,
  ) {}

  user: string | null = null;

  ngOnInit(){
    this.mainService.getUser().subscribe({
      next: (response): void => {
        // delete localstorage item, if data doesn't match with the server data

        if (!response[0] && localStorage.getItem('user')) localStorage.removeItem('user');

        if (response.length > 1) {

          this.user = response[0].name;

        } else {
          this.user = null;

        }

      },
      error: (err) => {
        console.error(err);
        this.user = null;
      }

    })


  }

}
