import { Routes } from '@angular/router';
import {adminGuard} from './guards/admin.guard';
import {userGuard} from './guards/user.guard';
import {AdminMDashboardComponent} from './admin-page/admin-m-dashboard/admin-m-dashboard.component';
import {AdminMProductsComponent} from './admin-page/admin-m-products/admin-m-products.component';
import {AdminPageComponent} from './admin-page/admin-page.component';

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
    },

    children: [
      { path: 'dashboard', component: AdminMDashboardComponent, data: { title: 'Dashboard'} },
      { path: 'products', component: AdminMProductsComponent, data: { title: 'Products' }},
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },



];
