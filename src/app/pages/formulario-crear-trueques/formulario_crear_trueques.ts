import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface PublicacionTrueque {
  articulo: string;
  descripcion: string;
  estado: string;
  categoria: string;
  buscaCambio: string;
  detalles: string;
  visibilidad: string;
  departamento: string;
  municipio: string;
  barrio: string;
  disponibleTrueque: string;
  cantidad: string;
  prioridad: string;
  mensajeContacto: string;
}

@Component({
  selector: 'app-formulario-crear-trueques',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './Formulario_crear_trueques.html',
  styleUrls: ['./Formulario_crear_trueques.css'],
})
export class Formulario_crear_trueques {
  modelo: PublicacionTrueque = {
    articulo: '',
    descripcion: '',
    estado: '',
    categoria: '',
    buscaCambio: '',
    detalles: '',
    visibilidad: 'publica',
    departamento: '',
    municipio: '',
    barrio: '',
    disponibleTrueque: 'si',
    cantidad: '',
    prioridad: 'baja',
    mensajeContacto: '',
  };

  ubicacionSeleccionada: { lat: number; lng: number } | null = null;

  readonly fechaCreacion = this.formatearFecha(new Date());
  readonly fechaModificacion = this.fechaCreacion;

  onSeleccionarUbicacion(): void {
    // TODO: integrar el selector de mapa (Google Maps / Leaflet, etc.)
    console.log('Abrir selector de ubicación en el mapa');
  }

  onSubmit(): void {
    const payload = {
      ...this.modelo,
      ubicacion: this.ubicacionSeleccionada,
    };

    // TODO: reemplazar con la llamada al servicio real
    console.log('Publicación de trueque lista para enviar:', payload);
  }

  private formatearFecha(fecha: Date): string {
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const hora = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');
    return `${dia}/${mes}/${fecha.getFullYear()} ${hora}:${minutos}`;
  }
}
