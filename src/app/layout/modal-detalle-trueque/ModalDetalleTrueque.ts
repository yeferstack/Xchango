import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Trueque } from '../../models/trueque.model';
import { TruequesService } from '../../services/trueques';

@Component({
  selector: 'app-modal-detalle-trueque',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ModalDetalleTrueque.html',
  styleUrl: './ModalDetalleTrueque.css',
})
export class ModalDetalleTruequeComponent implements OnInit {
  trueque: Trueque | null = null;
  imagenActivaIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private truequesService: TruequesService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.trueque = this.truequesService.obtenerPorId(id) ?? null;
  }

  volver(): void {
    this.router.navigate(['/home']);
  }

  alternarFavorito(): void {
    if (this.trueque) {
      this.truequesService.alternarFavorito(this.trueque);
    }
  }

  seleccionarImagen(indice: number): void {
    this.imagenActivaIndex = indice;
  }

  manejarErrorImagen(evento: Event): void {
    const img = evento.target as HTMLImageElement;
    img.src = 'https://placehold.co/600x450/ece2c9/1f1b16?text=Sin+imagen';
  }

  claseBadge(tipo: Trueque['tipo']): string {
    switch (tipo) {
      case 'Electrónicos':
        return 'badge badge--electronicos';
      case 'Servicios':
        return 'badge badge--servicios';
      case 'Bienes Físicos':
        return 'badge badge--bienes';
      case 'Vehículos':
        return 'badge badge--vehiculos';
      default:
        return 'badge';
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