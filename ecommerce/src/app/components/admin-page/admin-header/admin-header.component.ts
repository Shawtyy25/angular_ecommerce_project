import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map} from 'rxjs';
import {MainLogoutService} from '../../../services/main.logout.service';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-admin-header',
  imports: [],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss',
  standalone: true,
})
export class AdminHeaderComponent implements OnInit{

  @Input() profile: string | null = null;
  currentPage: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private logoutService: MainLogoutService, private authService: AuthService) {}


  ngOnInit(): void {
    this.setCurrPageFromRoute(this.route);

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.setCurrPageFromRoute(this.route));


  }

  logoutUser(): void {

    this.logoutService.logout().subscribe({
      next: (res) => {
        this.profile = null;
        this.authService.deleteUser();
        this.router.navigate(['/']);


      },

      error: (err) => {
        console.error(err);
      }
    })

  }

  setCurrPageFromRoute(route: ActivatedRoute) {
    while (route.firstChild) route = route.firstChild;
    this.currentPage = route.snapshot.data['title'];
  }

}
