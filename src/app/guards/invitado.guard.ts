import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { TruequesService } from '../services/trueques';

/*
  El formulario de registro vive dentro de /formulario y sus tres pasos
  los maneja el propio componente, así que acá solo evitamos que alguien
  que ya tiene sesión abierta se meta a crear otra cuenta.
*/
export const invitadoGuard: CanActivateFn = () => {
  const servicio = inject(TruequesService);
  const router = inject(Router);

  servicio.cargar();

  if (servicio.autenticado()) {
    return router.createUrlTree(['/home']);
  }

  return true;
};
