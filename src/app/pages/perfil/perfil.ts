import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class PerfilComponent {
  // Datos del usuario
  nombreUsuario: string = 'Miguel Perez';

  // Rutas de imágenes centralizadas
  logoUrl: string = 'assets/logo-xchango.jpeg';
  avatarUrl: string = 'assets/avatar-miguel.jpeg';

  // Calificación (para las estrellas)
  calificacion: number = 4;
  calificacionMaxima: number = 5;
  totalCalificacionesRequeridas: number = 5;

  estrellas(): boolean[] {
    return Array.from(
      { length: this.calificacionMaxima },
      (_, i) => i < this.calificacion
    );
  }
}