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
