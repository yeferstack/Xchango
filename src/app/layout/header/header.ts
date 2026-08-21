import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  /** Se emite al hacer clic en "Inicio" */
  @Output() irAInicio = new EventEmitter<void>();

  /** Se emite al hacer clic en "Favoritos" */
  @Output() verSoloFavoritos = new EventEmitter<void>();

  /** Municipio de Casanare seleccionado (controlado desde el padre, soporta [(municipioSeleccionado)]) */
  @Input() municipioSeleccionado: string | null = null;
  @Output() municipioSeleccionadoChange = new EventEmitter<string | null>();

  /** Número al que redirige el botón "Mensajes" (formato internacional, sin + ni espacios) */
  @Input() numeroWhatsApp = '573001112233';

  get enlaceWhatsApp(): string {
    return `https://wa.me/${this.numeroWhatsApp}`;
  }

  /** Municipios del departamento de Casanare */
  municipios: string[] = [
    'Aguazul',
    'Chameza',
    'Hato Corozal',
    'La Salina',
    'Mani',
    'Monterrey',
    'Nunchia',
    'Orocue',
    'Paz de Ariporo',
    'Pore',
    'Recetor',
    'Sabanalarga',
    'Sacama',
    'San Luis de Palenque',
    'Tamara',
    'Tauramena',
    'Trinidad',
    'Villanueva',
    'Yopal',
  ];

  mostrarModalMunicipio = false;
  municipioTemporal: string | null = null;

  abrirModalMunicipio(): void {
    this.municipioTemporal = this.municipioSeleccionado;
    this.mostrarModalMunicipio = true;
  }

  cerrarModalMunicipio(): void {
    this.mostrarModalMunicipio = false;
  }

  elegirMunicipioTemporal(municipio: string | null): void {
    this.municipioTemporal = municipio;
  }

  confirmarMunicipio(): void {
    this.municipioSeleccionado = this.municipioTemporal;
    this.municipioSeleccionadoChange.emit(this.municipioSeleccionado);
    this.mostrarModalMunicipio = false;
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
}
