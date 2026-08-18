import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../layout/header/header';
import { SidebarComponent, CategoriaTrueque } from '../../layout/sidebar/sidebar';
import { Trueque } from '../../models/trueque.model';
import { TruequesService } from '../../services/trueques';

type FiltroTrueque = 'todos' | 'bienes' | 'servicios' | 'digitales';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, SidebarComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit {
  busqueda = '';
  filtroActivo: FiltroTrueque = 'todos';
  categoriaSeleccionada = 'todos';
  mostrarSoloFavoritos = false;
  orden = 'Más recientes';

  categorias: CategoriaTrueque[] = [
    { id: 'todos', nombre: 'Todos', icono: 'grid' },
    { id: 'electronicos', nombre: 'Electrónicos', icono: 'phone' },
    { id: 'vehiculos', nombre: 'Vehículos', icono: 'car' },
    { id: 'ropa', nombre: 'Ropa', icono: 'shirt' },
    { id: 'hogar', nombre: 'Hogar', icono: 'home' },
    { id: 'deportes', nombre: 'Deportes', icono: 'bike' },
    { id: 'videojuegos', nombre: 'Videojuegos', icono: 'gamepad' },
    { id: 'libros', nombre: 'Libros', icono: 'book' },
    { id: 'muebles', nombre: 'Muebles', icono: 'cabinet' },
    { id: 'juguetes', nombre: 'Juguetes', icono: 'toy' },
  ];

  beneficios = [
    {
      titulo: 'Trueques seguros',
      descripcion: 'Perfiles verificados y comunidad confiable.',
      icono: 'shield',
    },
    {
      titulo: 'Comunidad activa',
      descripcion: 'Miles de personas intercambiando cada día.',
      icono: 'users',
    },
    {
      titulo: 'Rápido y fácil',
      descripcion: 'Publica tu trueque en minutos y recibe propuestas.',
      icono: 'bolt',
    },
    {
      titulo: 'Atención 24/7',
      descripcion: 'Estamos para ayudarte en todo momento.',
      icono: 'chat',
    },
  ];

  notificaciones = 2;

  constructor(
    private truequesService: TruequesService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  /** Todos los trueques, tomados del servicio compartido. */
  get trueques(): Trueque[] {
    return this.truequesService.trueques;
  }

  /** Combina búsqueda + tab (Bienes/Servicios/Digitales) + categoría del sidebar + solo-favoritos */
  get truequesFiltrados(): Trueque[] {
    let resultado = this.trueques;

    if (this.mostrarSoloFavoritos) {
      resultado = resultado.filter((t) => t.favorito);
    }

    if (this.filtroActivo === 'bienes') {
      resultado = resultado.filter(
        (t) => t.tipo === 'Bienes Físicos' || t.tipo === 'Vehículos' || t.tipo === 'Electrónicos',
      );
    } else if (this.filtroActivo === 'servicios') {
      resultado = resultado.filter((t) => t.tipo === 'Servicios');
    } else if (this.filtroActivo === 'digitales') {
      resultado = resultado.filter((t) => t.tipo === 'Digitales' || t.categoria === 'digitales');
    }

    if (this.categoriaSeleccionada !== 'todos') {
      resultado = resultado.filter((t) => t.categoria === this.categoriaSeleccionada);
    }

    if (this.busqueda.trim()) {
      const termino = this.busqueda.trim().toLowerCase();
      resultado = resultado.filter(
        (t) =>
          t.titulo.toLowerCase().includes(termino) ||
          t.autor.toLowerCase().includes(termino) ||
          t.ciudad.toLowerCase().includes(termino),
      );
    }

    return resultado;
  }

  get cantidadFavoritos(): number {
    return this.trueques.filter((t) => t.favorito).length;
  }

  seleccionarFiltro(filtro: FiltroTrueque): void {
    this.filtroActivo = filtro;
  }

  seleccionarCategoria(id: string): void {
    this.categoriaSeleccionada = id;
  }

  irAInicio(): void {
    this.mostrarSoloFavoritos = false;
    this.filtroActivo = 'todos';
    this.categoriaSeleccionada = 'todos';
    this.busqueda = '';
  }

  verSoloFavoritos(): void {
    this.mostrarSoloFavoritos = true;
  }

  alternarFavorito(trueque: Trueque, evento: Event): void {
    evento.stopPropagation();
    this.truequesService.alternarFavorito(trueque);
  }

  limpiarFiltros(): void {
    this.busqueda = '';
    this.filtroActivo = 'todos';
    this.categoriaSeleccionada = 'todos';
    this.mostrarSoloFavoritos = false;
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

  publicarTrueque(): void {
    // Punto de integración: abrir modal o navegar a la ruta de publicación
    console.log('Publicar un trueque');
  }

  manejarErrorImagen(evento: Event): void {
    const img = evento.target as HTMLImageElement;
    img.src = 'https://placehold.co/600x450/ece2c9/1f1b16?text=Sin+imagen';
  }

  /** Navega a la página de detalle del trueque (/trueque/:id). */
  irADetalle(trueque: Trueque): void {
    this.router.navigate(['/trueque', trueque.id]);
  }
}