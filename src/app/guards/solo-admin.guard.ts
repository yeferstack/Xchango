import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminsAdminService } from '../services/admin/admins-admin.service';

// Deja pasar solo al administrador.
// Un moderador puede moderar contenido, pero no crear ni borrar usuarios
// internos, así que se le manda al panel principal.
export const soloAdminGuard: CanActivateFn = () => {
  const admins = inject(AdminsAdminService);
  const router = inject(Router);

  if (admins.esAdministrador()) {
    return true;
  }

  return router.createUrlTree(['/admin/dashboard']);
};
