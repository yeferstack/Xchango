import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { TruequesService } from '../../services/trueques';
import { VerificarCodigoComponent } from '../../layout/verificar-codigo/verificar-codigo';

// Pantalla de inicio de sesión, solo con correo (sin contraseña: no se usa
// en este proyecto). Se entra con un código de verificación simulado que
// "llega" al correo — ver TruequesService.iniciarSesion.
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
  error = signal('');

  readonly mostrarVerificacion = signal(false);

  // A dónde volver después de entrar (lo pone el guard).
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

    if (!this.email.trim()) {
      this.error.set('Completa tu correo.');
      return;
    }

    // El correo se valida de verdad solo después del código (onCodigoVerificado).
    this.mostrarVerificacion.set(true);
  }

  onCodigoVerificado(): void {
    const mensaje = this.servicio.iniciarSesion(this.email);
    if (mensaje) {
      this.mostrarVerificacion.set(false);
      this.error.set(mensaje);
      return;
    }

    this.router.navigateByUrl(this.volverA);
  }
}
