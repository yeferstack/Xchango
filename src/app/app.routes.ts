import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { HomeComponent } from './pages/home/home';
import { ModalDetalleTruequeComponent } from './layout/modal-detalle-trueque/modal-detalle-trueque';
import { PerfilComponent } from './pages/perfil/perfil';
import { InformacionComponent } from './pages/informacion/informacion';
import { SeguridadComponent } from './pages/seguridad/seguridad';
import { LegalInfo } from './pages/legal-info/legal-info';
import { Formulario_crear_truequesComponent } from './pages/formulario-crear-trueques/formulario-crear-trueques';
import { Formulario_crear_usuarioComponent } from './pages/formulario-crear-usuario/formulario-crear-usuario';
import { LoginAdministracion } from './pages/login-administracion/login-administracion';
import { AdminLayout } from './pages/admin/admin-layout/admin-layout';
import { Administracion } from './pages/admin/administracion/administracion';
import { Dashboard } from './pages/admin/dashboard/dashboard';
import { Moderacion } from './pages/admin/moderacion/moderacion';
import { Ranking } from './pages/admin/ranking/ranking';    
import { Reportes } from './pages/admin/reportes/reportes';
import { Usuarios } from './pages/admin/usuarios/usuarios';
import { adminAuthGuard, adminInvitadoGuard } from './guards/admin-auth-guard';

export const routes: Routes = [

  // =========================
  // RUTA INICIAL
  // =========================
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // =========================
  // LOGIN
  // =========================
  {
    path: 'login',
    component: Login
  },

  // =========================
  // HOME
  // =========================
  {
    path: 'home',
    component: HomeComponent
  },

  // =========================
  // TRUEQUES
  // =========================
  {
    path: 'trueque/:id',
    component: ModalDetalleTruequeComponent
  },

  {
    path: 'trueque',
    component: Formulario_crear_truequesComponent
  },

  // =========================
  // CREAR USUARIO
  // =========================
  {
    path: 'formulario',
    component: Formulario_crear_usuarioComponent
  },

  // =========================
  // INFORMACIÓN LEGAL
  // =========================
  {
    path: 'legal-info',
    component: LegalInfo
  },

  // =========================
  // PERFIL
  // =========================
  {
    path: 'perfil',
    component: PerfilComponent
  },

  // =========================
  // PERFIL > INFORMACIÓN
  // =========================
  {
    path: 'perfil/informacion',
    component: InformacionComponent
  },

  // =========================
  // PERFIL > SEGURIDAD
  // =========================
  {
    path: 'perfil/seguridad',
    component: SeguridadComponent
  },

  // =========================
  // ADMINISTRACIÓN
  // =========================
  {
    path: 'admin/login',
    component: LoginAdministracion,
    canActivate: [adminInvitadoGuard],
  },
  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [adminAuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'reportes', component: Reportes },
      { path: 'administracion', component: Administracion },
      { path: 'usuarios', component: Usuarios },
      { path: 'moderacion', component: Moderacion },
      { path: 'ranking', component: Ranking },
    ],
  },

  // =========================
  // RUTA NO ENCONTRADA
  // =========================
  {
    path: '**',
    redirectTo: 'login'
  }
];