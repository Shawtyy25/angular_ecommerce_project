import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {MainLogoutService} from '../../../services/main.logout.service';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-ws-profile',
  imports: [],
  standalone: true,
  templateUrl: './ws-profile.component.html',
  styleUrl: './ws-profile.component.scss'
})
export class WsProfileComponent {
  constructor(private router: Router, private logoutService: MainLogoutService, private authService: AuthService) {}

  @Input() user: string | null = null;

  logoutUser(): void {

    this.logoutService.logout().subscribe({
      next: (res) => {
        this.user = null;
        this.authService.deleteUser();
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
