import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

/** Ítem de notificación mostrado en el menú desplegable de la campana */
export interface NotificacionItem {
  id: number;
  /** Tipo de evento, define el icono que se muestra */
  tipo: 'propuesta' | 'aceptado' | 'rechazado' | 'mensaje' | 'sistema';
  titulo: string;
  descripcion: string;
  tiempo: string;
  leida: boolean;
  avatar?: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {
  /** Texto de búsqueda, controlado desde el padre (soporta [(busqueda)]) */
  @Input() busqueda = '';
  @Output() busquedaChange = new EventEmitter<string>();

  /** Cantidad de notificaciones sin leer */
  @Input() notificaciones = 0;

  /** Cantidad de trueques marcados como favoritos */
  @Input() cantidadFavoritos = 0;

  /** Si la vista actual está mostrando solo favoritos (resalta el ítem del nav) */
  @Input() mostrarSoloFavoritos = false;

  /** URL del avatar del usuario logueado */
  @Input() avatarUrl = 'https://i.pravatar.cc/40?img=68';

  /** Nombre del usuario logueado, se muestra en la cabecera del menú de perfil */
  @Input() nombreUsuario = 'Tomás Cuéllar';

  /** Correo o usuario, se muestra bajo el nombre en el menú de perfil */
  @Input() correoUsuario = 'tomas@xchango.com';

  /** Lista de notificaciones a mostrar en el desplegable de la campana */
  @Input() notificacionesLista: NotificacionItem[] = [
    {
      id: 1,
      tipo: 'propuesta',
      titulo: 'Nueva propuesta de trueque',
      descripcion: 'Juan P. quiere cambiar su iPhone 13 por tu MacBook Pro',
      tiempo: 'Hace 10 min',
      leida: false,
      avatar: 'https://i.pravatar.cc/40?img=12',
    },
    {
      id: 2,
      tipo: 'aceptado',
      titulo: 'Trueque aceptado',
      descripcion: 'Valentina R. aceptó tu propuesta de audífonos Bluetooth',
      tiempo: 'Hace 2 horas',
      leida: false,
      avatar: 'https://i.pravatar.cc/40?img=32',
    },
    {
      id: 3,
      tipo: 'mensaje',
      titulo: 'Nuevo mensaje',
      descripcion: 'Santiago P. te envió un mensaje sobre tu publicación',
      tiempo: 'Ayer',
      leida: true,
      avatar: 'https://i.pravatar.cc/40?img=45',
    },
  ];

  /** Se emite al hacer clic en "Inicio" */
  @Output() irAInicio = new EventEmitter<void>();

  /** Se emite al hacer clic en "Favoritos" */
  @Output() verSoloFavoritos = new EventEmitter<void>();

  /** Se emiten al seleccionar una opción del menú de perfil */
  @Output() irAPerfil = new EventEmitter<void>();
  @Output() irAMisPublicaciones = new EventEmitter<void>();
  @Output() irADatosCuenta = new EventEmitter<void>();
  @Output() irASeguridad = new EventEmitter<void>();
  @Output() irAUbicacion = new EventEmitter<void>();
  @Output() cerrarSesion = new EventEmitter<void>();

  /** Se emite al hacer clic en una notificación puntual */
  @Output() verNotificacion = new EventEmitter<NotificacionItem>();
  /** Se emite al hacer clic en "Ver todas" dentro del menú de notificaciones */
  @Output() verTodasNotificaciones = new EventEmitter<void>();

  /** Número al que redirige el botón "Mensajes" (formato internacional, sin + ni espacios) */
  @Input() numeroWhatsApp = '573001112233';

  mostrarMenuPerfil = false;
  mostrarMenuNotificaciones = false;

  constructor(private elementRef: ElementRef) {}

  get enlaceWhatsApp(): string {
    return `https://wa.me/${this.numeroWhatsApp}`;
  }

  onBusquedaChange(valor: string): void {
    this.busqueda = valor;
    this.busquedaChange.emit(valor);
  }

  onInicio(): void {
    this.irAInicio.emit();
  }

  onFavoritos(): void {
    this.verSoloFavoritos.emit();
  }

  toggleMenuPerfil(): void {
    this.mostrarMenuPerfil = !this.mostrarMenuPerfil;
    if (this.mostrarMenuPerfil) {
      this.mostrarMenuNotificaciones = false;
    }
  }

  toggleMenuNotificaciones(): void {
    this.mostrarMenuNotificaciones = !this.mostrarMenuNotificaciones;
    if (this.mostrarMenuNotificaciones) {
      this.mostrarMenuPerfil = false;
    }
  }

  cerrarMenus(): void {
    this.mostrarMenuPerfil = false;
    this.mostrarMenuNotificaciones = false;
  }

  onSeleccionPerfil(emitter: EventEmitter<void>): void {
    emitter.emit();
    this.cerrarMenus();
  }

  onClickNotificacion(notificacion: NotificacionItem): void {
    this.verNotificacion.emit(notificacion);
    this.cerrarMenus();
  }

  onVerTodasNotificaciones(): void {
    this.verTodasNotificaciones.emit();
    this.cerrarMenus();
  }

  /** Icono (emoji) según el tipo de notificación, para mantener el desplegable liviano sin más SVGs */
  iconoNotificacion(tipo: NotificacionItem['tipo']): string {
    switch (tipo) {
      case 'propuesta':
        return '🔄';
      case 'aceptado':
        return '✅';
      case 'rechazado':
        return '✖️';
      case 'mensaje':
        return '💬';
      default:
        return '🔔';
    }
  }

  /** Cierra ambos menús al hacer clic fuera del header */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.cerrarMenus();
    }
  }

  /** Cierra ambos menús al presionar Escape */
  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.cerrarMenus();
  }
}
