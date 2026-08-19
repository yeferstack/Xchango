import { Routes } from '@angular/router';

import { Login } from './pages/login/login';

import { HomeComponent } from './pages/home/home';

import { ModalDetalleTruequeComponent } from './layout/modal-detalle-trueque/ModalDetalleTrueque';

import { PerfilComponent } from './pages/perfil/perfil';

import { InformacionComponent } from './pages/informacion/informacion';

import { SeguridadComponent } from './pages/seguridad/seguridad';

import { PrivacidadComponent } from './pages/privacidad/privacidad';

import { MisPublicacionesComponent } from './pages/mis_publicaciones/mis_publicaciones';

import { LegalInfo } from './pages/legal-info/legal-info';

import { Formulario_crear_truequesComponent } from './pages/formulario-crear-trueques/formulario_crear_trueques';

import { Formulario_crear_usuarioComponent } from './pages/formulario_crear_usuario/formulario_crear_usuario';


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
    path: 'trueque',
    component: Formulario_crear_truequesComponent
  },

  {
    path: 'trueque/:id',
    component: ModalDetalleTruequeComponent
  },


  // =========================
  // CREAR USUARIO
  // =========================
  {
    path: 'formulario',
    component: Formulario_crear_usuarioComponent
  },


  // =========================
  // PERFIL
  // =========================
  {
    path: 'perfil',
    component: PerfilComponent
  },


  // =========================
  // PERFIL > TU INFORMACIÓN
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
  // PERFIL > PRIVACIDAD
  // =========================
  {
    path: 'perfil/privacidad',
    component: PrivacidadComponent
  },


  // =========================
  // MIS PUBLICACIONES
  // =========================
  {
    path: 'mis-publicaciones',
    component: MisPublicacionesComponent
  },


  // =========================
  // INFORMACIÓN LEGAL
  // =========================
  {
    path: 'legal-info',
    component: LegalInfo
  },


  // =========================
  // RUTA NO ENCONTRADA
  // =========================
  {
    path: '**',
    redirectTo: 'login'
  }

];