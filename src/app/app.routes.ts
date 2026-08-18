import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Formulario_crear_truequesComponent } from './pages/formulario-crear-trueques/formulario_crear_trueques';
import { Formulario_crear_usuarioComponent } from './pages/formulario_crear_usuario/formulario_crear_usuario';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'formulario',
    component: Formulario_crear_usuarioComponent,
  },
  {
    path: 'trueque',
    component: Formulario_crear_truequesComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];