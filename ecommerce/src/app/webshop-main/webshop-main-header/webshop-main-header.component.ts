import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {MainLogoutService} from '../../services/main.logout.service';
import {WsSearchbarComponent} from './ws-searchbar/ws-searchbar.component';
import {WsFavouritesComponent} from './ws-favourites/ws-favourites.component';
import {WsCartComponent} from './ws-cart/ws-cart.component';
import {WsProfileComponent} from './ws-profile/ws-profile.component';

@Component({
  selector: 'app-webshop-main-header',
  templateUrl: './webshop-main-header.component.html',
  styleUrl: './webshop-main-header.component.scss',
  standalone: true,
  imports: [
    WsSearchbarComponent,
    WsFavouritesComponent,
    WsCartComponent,
    WsProfileComponent,
  ]
})
export class WebshopMainHeaderComponent {
  constructor(private router: Router, private logoutService: MainLogoutService) {}

  @Input() profile: string | null = null;

  logoutUser(): void {

    this.logoutService.logout().subscribe({
      next: (res) => {
        this.profile = null;
        this.router.navigate(['/']);

      },

      error: (err) => {
        console.error(err);
      }
    })

  }

  moveToLogin(): void {
    this.router.navigate(['/']);
  }

}
