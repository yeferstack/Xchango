import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TruequesService } from '../services/trueques';

// Cuida las páginas que necesitan sesión.
// Si nadie inició sesión, manda a /acceso y guarda a dónde iba el usuario
// para devolverlo ahí después de entrar.
export const authGuard: CanActivateFn = (ruta, estado) => {
  const servicio = inject(TruequesService);
  const router = inject(Router);

  servicio.cargar();

  if (servicio.autenticado()) {
    return true;
  }

  return router.createUrlTree(['/acceso'], {
    queryParams: { volverA: estado.url },
  });
};
