import { Component, OnInit, inject } from '@angular/core';
import { IconoComponent } from '../../components/icono/icono';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { TruequesService } from '../../services/trueques';
import { Notificacion } from '../../models/notificacion.model';
import { TruequeVista } from '../../models/trueque.model';

/**
 * HU54-HU59: bandeja de avisos.
 *
 * NO es mensajería. Son avisos de una sola vía; la conversación real ocurre en
 * WhatsApp. Por eso no hay campo para responder.
 */
@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [IconoComponent, CommonModule, RouterLink],
  templateUrl: './notificaciones.html',
  styleUrl: './notificaciones.css',
})
export class NotificacionesComponent implements OnInit {
  private readonly srv = inject(TruequesService);
  private readonly router = inject(Router);
  private readonly location = inject(Location);

  readonly notificaciones = this.srv.notificaciones;
  readonly sinLeer = this.srv.notificacionesSinLeer;

  /** Busca el trueque al que se refiere el aviso. */
  truequeDe(n: Notificacion): TruequeVista | undefined {
    if (!n.referenciaId) return undefined;
    return this.srv.trueques().find((t) => t.id === n.referenciaId);
  }

  /**
   * Solo se puede responder si el aviso es una solicitud, el trueque sigue
   * pendiente y el usuario es el dueño de la publicación.
   */
  puedeResponder(n: Notificacion): boolean {
    const t = this.truequeDe(n);
    if (!t) return false;
    return (
      n.tipo === 'solicitud' &&
      t.estado === 'pendiente' &&
      t.propietarioId === this.srv.usuarioActualId()
    );
  }

  aceptar(n: Notificacion): void {
    const t = this.truequeDe(n);
    if (t) {
      this.srv.aceptarTrueque(t.id);
      this.srv.marcarNotificacionLeida(n.id);
    }
  }

  rechazar(n: Notificacion): void {
    const t = this.truequeDe(n);
    if (t) {
      this.srv.rechazarTrueque(t.id);
      this.srv.marcarNotificacionLeida(n.id);
    }
  }

  ngOnInit(): void {
    this.srv.cargar();
  }

  volver(): void {
    this.location.back();
  }

  marcarTodas(): void {
    this.srv.marcarTodasLeidas();
  }

  /** Marca como leída y navega al trueque o a la publicación referenciada. */
  abrir(n: Notificacion): void {
    this.srv.marcarNotificacionLeida(n.id);

    if (!n.referenciaId) return;
    if (n.referenciaId.startsWith('tr')) this.router.navigate(['/mis-trueques']);
    else if (n.referenciaId.startsWith('pub')) this.router.navigate(['/trueque', n.referenciaId]);
  }

  icono(tipo: Notificacion['tipo']): string {
    if (tipo === 'aceptada') return 'check_circle';
    if (tipo === 'rechazada') return 'cancel';
    return 'swap_horiz';
  }
}
