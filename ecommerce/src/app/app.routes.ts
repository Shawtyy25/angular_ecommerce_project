import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./login/login.component').then(m => m.LoginComponent);
    }
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
  }

];
