import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { PerfilComponent } from './pages/perfil/perfil';

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
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];