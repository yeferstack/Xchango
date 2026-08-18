import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { PerfilComponent } from './pages/perfil/perfil';
import { InformacionComponent } from './pages/informacion/informacion';
import { SeguridadComponent } from './pages/seguridad/seguridad';
import { PrivacidadComponent } from './pages/privacidad/privacidad';
import { MisPublicacionesComponent } from './pages/mis_publicaciones/mis_publicaciones';

export const routes: Routes = [

  // RUTA INICIAL
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // LOGIN
  {
    path: 'login',
    component: Login
  },

  // PERFIL
  {
    path: 'perfil',
    component: PerfilComponent
  },

  // PERFIL > TU INFORMACIÓN
  {
    path: 'perfil/informacion',
    component: InformacionComponent
  },

  // PERFIL > SEGURIDAD
  {
    path: 'perfil/seguridad',
    component: SeguridadComponent
  },

  // PERFIL > PRIVACIDAD
  {
    path: 'perfil/privacidad',
    component: PrivacidadComponent
  },

  // MIS PUBLICACIONES
  {
    path: 'mis-publicaciones',
    component: MisPublicacionesComponent
  },

  // RUTA NO ENCONTRADA
  {
    path: '**',
    redirectTo: 'login'
  }

];