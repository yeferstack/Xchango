import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { HomeComponent } from './pages/home/home';
import { ModalDetalleTruequeComponent } from './layout/modal-detalle-trueque/ModalDetalleTrueque';
import { PerfilComponent } from './pages/perfil/perfil';
import { InformacionComponent } from './pages/informacion/informacion';
import { SeguridadComponent } from './pages/seguridad/seguridad';
import { LegalInfo } from './pages/legal-info/legal-info';
import { Formulario_crear_truequesComponent } from './pages/formulario-crear-trueques/formulario_crear_trueques';
import { Formulario_crear_usuarioComponent } from './pages/formulario_crear_usuario/formulario_crear_usuario';

export const routes: Routes = [
    {
        path: 'login',
        component: Login,
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'trueque/:id',
        component: ModalDetalleTruequeComponent,
    },
    {
        path: 'trueque',
        component: Formulario_crear_truequesComponent,
    },
    {
        path: 'formulario',
        component: Formulario_crear_usuarioComponent,
    },
    {
        path: 'legal-info',
        component: LegalInfo,
    },
    // PERFIL
    {
        path: 'perfil',
        component: PerfilComponent,
    },
    // PERFIL > TU INFORMACIÓN
    {
        path: 'perfil/informacion',
        component: InformacionComponent,
    },
    // PERFIL > SEGURIDAD
    {
        path: 'perfil/seguridad',
        component: SeguridadComponent,
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
];