import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { PerfilComponent } from './pages/perfil/perfil';
import { HomeComponent } from './pages/home/home';
import { Formulario_crear_trueques } from './pages/formulario-crear-trueques/formulario_crear_trueques';
import { Formulario_crear_usuarioComponent } from './pages/formulario_crear_usuario/formulario_crear_usuario';

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
    path: 'formulario',
    component: Formulario_crear_usuarioComponent
  },
  {
    path: 'trueque',
    component: Formulario_crear_trueques
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];