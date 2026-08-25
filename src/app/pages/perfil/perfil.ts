import { Component, OnInit, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { IconoComponent } from '../../components/icono/icono';
import { TruequesService } from '../../services/trueques';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [IconoComponent, CommonModule, RouterLink],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class PerfilComponent implements OnInit {
  private servicio = inject(TruequesService);
  private router = inject(Router);

  // Cuántas calificaciones hacen falta para mostrar el promedio en público.
  readonly totalCalificacionesRequeridas = 5;
  readonly calificacionMaxima = 5;

  ngOnInit(): void {
    this.servicio.cargar();
  }

  // DATOS DEL USUARIO EN SESIÓN

  get nombreUsuario(): string {
    return this.servicio.usuarioActual()?.nombre ?? 'Invitado';
  }

  get avatarUrl(): string {
    return this.servicio.usuarioActual()?.avatar ?? 'Logo-xchango/avatar-miguel.jpeg';
  }

  get ubicacion(): string {
    return this.servicio.usuarioActual()?.ubicacion ?? 'Casanare';
  }

  get calificacion(): number {
    return this.servicio.usuarioActual()?.calificacion ?? 0;
  }

  get totalCalificaciones(): number {
    return this.servicio.usuarioActual()?.totalCalificaciones ?? 0;
  }

  // Texto libre del perfil (HU21). Si no ha escrito nada, un texto de ayuda.
  get descripcion(): string {
    const texto = this.servicio.usuarioActual()?.descripcion?.trim();
    return texto || 'Todavía no has agregado una descripción a tu perfil.';
  }

  get verificado(): boolean {
    return this.servicio.usuarioActual()?.verificacion === 'verificado';
  }

  // Fecha de registro en bruto (se formatea en el template con DatePipe).
  get fechaRegistro(): string | null {
    return this.servicio.usuarioActual()?.fechaRegistro ?? null;
  }

  get totalPublicaciones(): number {
    return this.servicio.usuarioActual()?.publicaciones ?? 0;
  }

  get totalIntercambios(): number {
    return this.servicio.usuarioActual()?.intercambios ?? 0;
  }

  // Avisos sin leer, para el punto rojo de la campana.
  get notificaciones(): number {
    return this.servicio.notificacionesSinLeer();
  }

  // true cuando ya tiene suficientes calificaciones para mostrarlas.
  get muestraCalificacion(): boolean {
    return this.totalCalificaciones >= this.totalCalificacionesRequeridas;
  }

  // Estrellas llenas y vacías según el promedio.
  estrellas(): boolean[] {
    return Array.from(
      { length: this.calificacionMaxima },
      (_, i) => i < Math.round(this.calificacion),
    );
  }

  // MINI MENÚ DEL AVATAR

  readonly menuAbierto = signal(false);

  toggleMenu(): void {
    this.menuAbierto.update((v) => !v);
  }

  @HostListener('document:click')
  cerrarMenu(): void {
    this.menuAbierto.set(false);
  }

  cerrarSesion(): void {
    this.servicio.cerrarSesion();
    this.router.navigate(['/login']);
  }
}
