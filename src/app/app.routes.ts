import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { HomeComponent } from './pages/home/home';
import { ModalDetalleTruequeComponent } from './layout/modal-detalle-trueque/ModalDetalleTrueque';
import { PerfilComponent } from './pages/perfil/perfil';
import { InformacionComponent } from './pages/informacion/informacion';
import { SeguridadComponent } from './pages/seguridad/seguridad';

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
