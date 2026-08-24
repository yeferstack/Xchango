import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicacionVista, TipoPublicacion } from '../../models/publicacion.model';
import { TruequesService } from '../../services/trueques';

@Component({
  selector: 'app-modal-detalle-trueque',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-detalle-trueque.html',
  styleUrl: './modal-detalle-trueque.css',
})
export class ModalDetalleTruequeComponent implements OnInit {
  /**
   * Id de la publicación cuando el detalle se abre COMO MODAL sobre el home.
   * Si no llega, se toma de la ruta /trueque/:id (entrada directa por URL).
   */
  @Input() publicacionId: string | null = null;

  /** Avisa al home que hay que cerrar el modal. */
  @Output() cerrado = new EventEmitter<void>();

  /** true cuando se muestra encima del home, false cuando es su propia página. */
  get esModal(): boolean {
    return this.publicacionId !== null;
  }

  private id = '';
  imagenActivaIndex = 0;

  /**
   * Getter en lugar de propiedad: los datos llegan por HTTP. `obtenerPorId`
   * busca dentro de un `computed` memorizado, así que devuelve siempre la
   * misma referencia y no dispara re-render en cada ciclo.
   */
  get trueque(): PublicacionVista | null {
    return this.truequesService.obtenerPorId(this.id) ?? null;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private truequesService: TruequesService,
  ) {}

  ngOnInit(): void {
    // Si viene por [publicacionId] es un modal sobre el home;
    // si no, se toma el id de la ruta /trueque/:id.
    this.id = this.publicacionId ?? this.route.snapshot.paramMap.get('id') ?? '';
    this.truequesService.cargar();
  }

  volver(): void {
    // Si está encima del home solo se cierra; si es su propia página, navega.
    if (this.esModal) {
      this.cerrado.emit();
    } else {
      this.router.navigate(['/home']);
    }
  }

  /** Cierra al hacer clic en el fondo oscuro, no al tocar la tarjeta. */
  cerrarPorFondo(evento: MouseEvent): void {
    if (this.esModal && evento.target === evento.currentTarget) {
      this.volver();
    }
  }

  alternarFavorito(): void {
    if (this.trueque) {
      this.truequesService.alternarFavorito(this.trueque);
    }
  }

  /** Pasa a la foto anterior; al llegar al inicio vuelve a la última. */
  fotoAnterior(): void {
    const total = this.imagenes.length;
    this.imagenActivaIndex = (this.imagenActivaIndex - 1 + total) % total;
  }

  /** Pasa a la siguiente; al llegar al final vuelve a la primera. */
  fotoSiguiente(): void {
    this.imagenActivaIndex = (this.imagenActivaIndex + 1) % this.imagenes.length;
  }

  seleccionarImagen(indice: number): void {
    this.imagenActivaIndex = indice;
  }

  manejarErrorImagen(evento: Event): void {
    const img = evento.target as HTMLImageElement;
    img.src = 'https://placehold.co/600x450/ece2c9/1f1b16?text=Sin+imagen';
  }

  /** Texto que el usuario ofrece a cambio (HU42). */
  ofrezco = '';
  mensaje = '';

  get esMia(): boolean {
    const t = this.trueque;
    return !!t && t.usuarioId === this.truequesService.usuarioActualId();
  }

  /** Envía la solicitud de trueque y avisa al dueño de la publicación. */
  solicitarTrueque(): void {
    const t = this.trueque;
    if (!t) return;

    const error = this.truequesService.solicitarTrueque(t.id, this.ofrezco);
    if (error) {
      this.mensaje = error;
      return;
    }

    this.mensaje = 'Solicitud enviada. El dueño recibirá una notificación.';
    this.ofrezco = '';
  }

  irAEditar(): void {
    const t = this.trueque;
    if (t) this.router.navigate(['/trueque', t.id, 'editar']);
  }

  /** Reutiliza SOLO clases que ya existen en tu CSS. Cero cambios de estilo. */
  claseBadge(tipo: TipoPublicacion): string {
    return this.truequesService.claseBadge(tipo);
  }

  /** Abre WhatsApp con el dueño. XchanGo no tiene chat interno. */
  contactarPorWhatsApp(): void {
    const t = this.trueque;
    if (!t) return;
    const enlace = this.truequesService.enlaceWhatsApp(t);
    if (enlace) {
      window.open(enlace, '_blank');
    } else {
      // Es tu propia publicación: no tiene sentido escribirte a ti mismo.
      this.router.navigate(['/mis-publicaciones']);
    }
  }

  get imagenes(): string[] {
    if (!this.trueque) return [];
    return this.trueque.imagenes?.length ? this.trueque.imagenes : [this.trueque.imagen];
  }

  get descripcion(): string {
    if (!this.trueque) return '';
    if (this.trueque.descripcion) {
      return this.trueque.descripcion;
    }
    return `${this.trueque.titulo}, publicado por ${this.trueque.autor} en ${this.trueque.ciudad}. Escríbele para conocer el estado del bien, condiciones de entrega y qué espera recibir a cambio.`;
  }

  get caracteristicas(): { label: string; valor: string }[] {
    if (!this.trueque) return [];
    if (this.trueque.caracteristicas?.length) {
      return this.trueque.caracteristicas;
    }
    return [
      { label: 'Categoría', valor: this.trueque.tipo },
      { label: 'Ubicación', valor: this.trueque.ciudad },
    ];
  }

  get intereses(): string[] {
    if (!this.trueque) return [];
    if (this.trueque.interesesCambio?.length) {
      return this.trueque.interesesCambio;
    }
    return ['Abierto a propuestas', 'Cuéntale qué tienes para ofrecer'];
  }
}