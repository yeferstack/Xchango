import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { TruequesService } from '../../services/trueques';
import { VerificarCodigoComponent } from '../../layout/verificar-codigo/verificar-codigo';

/**
 * Pantalla de inicio de sesión con correo y contraseña.
 * La landing de /login solo deja elegir el método; el formulario real está aquí.
 *
 * El login es una simulación de práctica: cualquier correo con formato
 * válido y cualquier contraseña entran (ver TruequesService.iniciarSesion).
 * Antes de entrar de verdad se muestra un paso de "verificación por correo"
 * también simulado.
 */
@Component({
  selector: 'app-acceso',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, VerificarCodigoComponent],
  templateUrl: './acceso.html',
  styleUrl: './acceso.css',
})
export class AccesoComponent implements OnInit {
  private servicio = inject(TruequesService);
  private router = inject(Router);
  private ruta = inject(ActivatedRoute);

  email = '';
  password = '';
  error = signal('');

  readonly mostrarVerificacion = signal(false);

  /** A dónde volver después de entrar (lo pone el guard). */
  private volverA = '/home';

  ngOnInit(): void {
    this.servicio.cargar();
    this.volverA = this.ruta.snapshot.queryParamMap.get('volverA') ?? '/home';
  }

  entrar(): void {
    this.error.set('');

    if (!this.servicio.listo()) {
      this.error.set('Los datos todavía se están cargando, intenta en un segundo.');
      return;
    }

    if (!this.email.trim() || !this.password) {
      this.error.set('Completa correo y contraseña.');
      return;
    }

    // El correo/contraseña se validan de verdad solo después del código
    // (onCodigoVerificado), así el flujo se ve como uno real.
    this.mostrarVerificacion.set(true);
  }

  onCodigoVerificado(): void {
    const mensaje = this.servicio.iniciarSesion(this.email, this.password);
    if (mensaje) {
      this.mostrarVerificacion.set(false);
      this.error.set(mensaje);
      return;
    }

    this.router.navigateByUrl(this.volverA);
  }
}
