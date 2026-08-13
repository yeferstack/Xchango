import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { PerfilComponent } from './pages/perfil/perfil';
import { HomeComponent } from './pages/home/home';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'perfil',
    component: PerfilComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];