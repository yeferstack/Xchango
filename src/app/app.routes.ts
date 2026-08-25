import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { HomeComponent } from './pages/home/home';
import { ModalDetalleTruequeComponent } from './layout/modal-detalle-trueque/modal-detalle-trueque';
import { PerfilComponent } from './pages/perfil/perfil';
import { InformacionComponent } from './pages/informacion/informacion';
import { SeguridadComponent } from './pages/seguridad/seguridad';
import { LegalInfo } from './pages/legal-info/legal-info';
import { FormularioCrearTruequesComponent } from './pages/formulario-crear-trueques/formulario-crear-trueques';
import { FormularioCrearUsuarioComponent } from './pages/formulario-crear-usuario/formulario-crear-usuario';
import { LoginAdministracion } from './pages/login-administracion/login-administracion';
import { AdminLayout } from './pages/admin/admin-layout/admin-layout';
import { Administracion } from './pages/admin/administracion/administracion';
import { Dashboard } from './pages/admin/dashboard/dashboard';
import { Moderacion } from './pages/admin/moderacion/moderacion';
import { Ranking } from './pages/admin/ranking/ranking';    
import { Reportes } from './pages/admin/reportes/reportes';
import { Usuarios } from './pages/admin/usuarios/usuarios';
import { adminAuthGuard, adminInvitadoGuard } from './guards/admin-auth-guard';
import { FormularioEditarTruequeComponent } from './pages/formulario-editar-trueque/formulario-editar-trueque';
import { DatosCuentaComponent } from './pages/datos-cuenta/datos-cuenta';
import { UbicacionComponent } from './pages/ubicacion/ubicacion';
import { MisPublicacionesComponent } from './pages/mis-publicaciones/mis-publicaciones';
import { MisTruequesComponent } from './pages/mis-trueques/mis-trueques';
import { NotificacionesComponent } from './pages/notificaciones/notificaciones';
import { AccesoComponent } from './pages/acceso/acceso';
import { authGuard } from './guards/auth.guard';
import { soloAdminGuard } from './guards/solo-admin.guard';
import { DocumentosComponent } from './pages/admin/documentos/documentos';
import { FormularioCrearUsuarioAdminComponent } from './pages/admin/formulario-crear-usuario-admin/formulario-crear-usuario-admin';

export const routes: Routes = [

  // ruta inicial
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // login
  {
    path: 'login',
    component: Login
  },
  {
    // Formulario de correo y contraseña
    path: 'acceso',
    component: AccesoComponent
  },

  // home
  {
    path: 'home',
    component: HomeComponent
  },

  // trueques
  {
    path: 'trueque/:id',
    component: ModalDetalleTruequeComponent
  },

  {
    path: 'trueque',
    component: FormularioCrearTruequesComponent,
    canActivate: [authGuard]
  },

  // crear usuario
  {
    path: 'formulario',
    component: FormularioCrearUsuarioComponent
  },
  {
    path: 'trueque/:id/editar',
    component: FormularioEditarTruequeComponent,
    canActivate: [authGuard]
  },
  {
    // Se conserva la ruta antigua para no romper enlaces existentes.
    path: 'editar',
    component: FormularioEditarTruequeComponent,
    canActivate: [authGuard]
  },

  // PERFIL > DATOS DE TU CUENTA
{
  path: 'perfil/cuenta',
  component: DatosCuentaComponent,
    canActivate: [authGuard]
},

// perfil > ubicación
{
  path: 'perfil/ubicacion',
  component: UbicacionComponent,
    canActivate: [authGuard]
},
// mis publicaciones
{
  path: 'mis-publicaciones',
  component: MisPublicacionesComponent,
    canActivate: [authGuard]
},

  // información legal
  {
    path: 'legal-info',
    component: LegalInfo
  },

  // perfil
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [authGuard]
  },

  // perfil > información
  {
    path: 'perfil/informacion',
    component: InformacionComponent,
    canActivate: [authGuard]
  },

  // perfil > seguridad
  {
    path: 'perfil/seguridad',
    component: SeguridadComponent,
    canActivate: [authGuard]
  },

  // administración
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
      // Crear moderadores: solo el administrador entra aquí.
      { path: 'crear-usuario', component: FormularioCrearUsuarioAdminComponent, canActivate: [soloAdminGuard] },
      { path: 'documentos', component: DocumentosComponent },
      { path: 'usuarios', component: Usuarios },
      { path: 'moderacion', component: Moderacion },
      { path: 'ranking', component: Ranking },
    ],
  },

  // TRUEQUES Y AVISOS DEL USUARIO
  {
    path: 'mis-trueques',
    component: MisTruequesComponent,
    canActivate: [authGuard]
  },
  {
    path: 'notificaciones',
    component: NotificacionesComponent,
    canActivate: [authGuard]
  },

  // ALIAS: cierran enlaces que antes no resolvían
  { path: 'explorar', redirectTo: 'home', pathMatch: 'full' },
  { path: 'servicios', redirectTo: 'home', pathMatch: 'full' },
  { path: 'favoritos', redirectTo: 'home', pathMatch: 'full' },
  { path: 'publicar', redirectTo: 'trueque', pathMatch: 'full' },
  { path: 'mensajes', redirectTo: 'notificaciones', pathMatch: 'full' },
  { path: 'perfil/privacidad', redirectTo: 'perfil/seguridad', pathMatch: 'full' },

  // ruta no encontrada
  {
    path: '**',
    redirectTo: 'login'
  }
];