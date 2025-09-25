import { Routes } from '@angular/router';
import {adminGuard} from './guards/admin.guard';
import {userGuard} from './guards/user.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./login/login.component').then(m => m.LoginComponent);
    },
    canActivate: [userGuard],
  },

  {
    path: 'registration',
    loadComponent: () => {
      return import('./registration/registration.component').then(m => m.RegistrationComponent);
    }
  },
  {
    path: 'main',
    loadComponent: () => {
      return import('./webshop-main/webshop-main.component').then(m => m.WebshopMainComponent);
    }
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () => {
      return import('./admin-page/admin-page.component').then(m => m.AdminPageComponent);
    }
  }

];
