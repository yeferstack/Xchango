import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, HostListener, Input, OnDestroy, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent implements OnDestroy {
  // Se esconde al bajar y vuelve a salir al subir.
  @HostBinding('class.header--oculto') oculto = false;

  private ultimaPosicion = 0;

  @HostListener('window:scroll')
  alHacerScroll(): void {
    const posicion = window.scrollY;

    // El > 120 evita que parpadee con los movimientos pequeños del inicio.
    const bajando = posicion > this.ultimaPosicion && posicion > 120;
    this.oculto = bajando;

    // La barra de filtros se apoya en esta medida: cuando el header
    // desaparece, sube para ocupar su lugar.
    document.body.classList.toggle('header-oculto', bajando);


    this.ultimaPosicion = posicion;
  }

  ngOnDestroy(): void {
    document.body.classList.remove('header-oculto');
  }


  // Texto de búsqueda, controlado desde el padre (soporta [(busqueda)])
  @Input() busqueda = '';
  @Output() busquedaChange = new EventEmitter<string>();

  // Cantidad de notificaciones sin leer
  @Input() notificaciones = 0;

  // Cantidad de trueques marcados como favoritos
  @Input() cantidadFavoritos = 0;

  // Si la vista actual está mostrando solo favoritos
  @Input() mostrarSoloFavoritos = false;

  // URL del avatar del usuario logueado
  @Input() avatarUrl = 'https://i.pravatar.cc/40?img=68';

  // Se emite al hacer clic en "Inicio"
  @Output() irAInicio = new EventEmitter<void>();

  // Se emite al hacer clic en "Favoritos"
  @Output() verSoloFavoritos = new EventEmitter<void>();

  // Se emite al hacer clic en "Servicios": el home filtra por ese tipo
  @Output() verServicios = new EventEmitter<void>();

  constructor(private router: Router) {}

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

  onServicios(): void {
    this.verServicios.emit();
  }

  // Abre el formulario para crear una publicación.
  irAPublicar(): void {
    this.router.navigate(['/trueque']);
  }

  // La campana lleva a la bandeja de avisos.
  irANotificaciones(): void {
    this.router.navigate(['/notificaciones']);
  }

  // La foto de la derecha lleva al perfil del usuario.
  irAPerfil(): void {
    this.router.navigate(['/perfil']);
  }
}
