import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriaTrueque, SidebarComponent } from '../../layout/sidebar/sidebar';

interface Trueque {
  id: number;
  titulo: string;
  tipo: 'Electrónicos' | 'Servicios' | 'Bienes Físicos' | 'Vehículos' | 'Digitales';
  categoria: string;
  imagen: string;
  autor: string;
  municipio: string;
  avatar: string;
  favorito: boolean;
}

type FiltroTrueque = 'todos' | 'bienes' | 'servicios' | 'digitales';

const CLAVE_FAVORITOS = 'xchango_favoritos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
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

  trueques: Trueque[] = [
    // --- Electrónicos ---
    {
      id: 1,
      titulo: 'iPhone 13 \\ 128GB',
      tipo: 'Electrónicos',
      categoria: 'electronicos',
      imagen: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=600&q=80',
      autor: 'Juan P.',
      municipio: 'Aguazul',
      avatar: 'https://i.pravatar.cc/40?img=12',
      favorito: false,
    },
    {
      id: 2,
      titulo: 'MacBook Pro 14"',
      tipo: 'Electrónicos',
      categoria: 'electronicos',
      imagen: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
      autor: 'Valentina R.',
      municipio: 'Mani',
      avatar: 'https://i.pravatar.cc/40?img=33',
      favorito: false,
    },
    {
      id: 3,
      titulo: 'Audífonos Bluetooth',
      tipo: 'Electrónicos',
      categoria: 'electronicos',
      imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
      autor: 'Santiago P.',
      municipio: 'Paz de Ariporo',
      avatar: 'https://i.pravatar.cc/40?img=47',
      favorito: false,
    },
    {
      id: 4,
      titulo: 'Smartwatch Serie 8',
      tipo: 'Electrónicos',
      categoria: 'electronicos',
      imagen: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
      autor: 'Camila T.',
      municipio: 'Mani',
      avatar: 'https://i.pravatar.cc/40?img=22',
      favorito: false,
    },

    // --- Vehículos ---
    {
      id: 5,
      titulo: 'Nissan GT-R R35',
      tipo: 'Vehículos',
      categoria: 'vehiculos',
      imagen: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80',
      autor: 'Andrés V.',
      municipio: 'Monterrey',
      avatar: 'https://i.pravatar.cc/40?img=15',
      favorito: false,
    },
    {
      id: 6,
      titulo: 'Pulsar NS 200',
      tipo: 'Vehículos',
      categoria: 'vehiculos',
      imagen: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&q=80',
      autor: 'Mateo L.',
      municipio: 'Aguazul',
      avatar: 'https://i.pravatar.cc/40?img=51',
      favorito: false,
    },
    {
      id: 7,
      titulo: 'Camioneta Toyota Hilux',
      tipo: 'Vehículos',
      categoria: 'vehiculos',
      imagen: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80',
      autor: 'Felipe A.',
      municipio: 'Yopal',
      avatar: 'https://i.pravatar.cc/40?img=5',
      favorito: false,
    },

    // --- Ropa ---
    {
      id: 8,
      titulo: 'Camisa Blanca',
      tipo: 'Bienes Físicos',
      categoria: 'ropa',
      imagen: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
      autor: 'Daniela M.',
      municipio: 'Mani',
      avatar: 'https://i.pravatar.cc/40?img=60',
      favorito: false,
    },
    {
      id: 9,
      titulo: 'Chaquetas',
      tipo: 'Bienes Físicos',
      categoria: 'ropa',
      imagen: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80',
      autor: 'Julián R.',
      municipio: 'Monterrey',
      avatar: 'https://i.pravatar.cc/40?img=18',
      favorito: false,
    },
    {
      id: 10,
      titulo: 'Variedad de Camisas',
      tipo: 'Bienes Físicos',
      categoria: 'ropa',
      imagen: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80',
      autor: 'Manuela S.',
      municipio: 'Tauramena',
      avatar: 'https://i.pravatar.cc/40?img=29',
      favorito: false,
    },

    // --- Hogar ---
    {
      id: 11,
      titulo: 'Servicio de soldadura',
      tipo: 'Servicios',
      categoria: 'hogar',
      imagen: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80',
      autor: 'Carlos M.',
      municipio: 'Aguazul',
      avatar: 'https://i.pravatar.cc/40?img=44',
      favorito: false,
    },
    {
      id: 12,
      titulo: 'Servicio de jardinería',
      tipo: 'Servicios',
      categoria: 'hogar',
      imagen: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
      autor: 'Laura G.',
      municipio: 'Tauramena',
      avatar: 'https://i.pravatar.cc/40?img=3',
      favorito: false,
    },
    {
      id: 13,
      titulo: 'Juego de sala 3 puestos',
      tipo: 'Bienes Físicos',
      categoria: 'hogar',
      imagen: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80',
      autor: 'Isabel N.',
      municipio: 'Tauramena',
      avatar: 'https://i.pravatar.cc/40?img=66',
      favorito: false,
    },

    // --- Deportes ---
    {
      id: 14,
      titulo: 'Bicicleta de montaña',
      tipo: 'Bienes Físicos',
      categoria: 'deportes',
      imagen: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&q=80',
      autor: 'Óscar D.',
      municipio: 'Villanueva',
      avatar: 'https://i.pravatar.cc/40?img=10',
      favorito: false,
    },
    {
      id: 15,
      titulo: 'Pesas de 10Kg',
      tipo: 'Bienes Físicos',
      categoria: 'deportes',
      imagen: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80',
      autor: 'Kevin O.',
      municipio: 'Aguazul',
      avatar: 'https://i.pravatar.cc/40?img=37',
      favorito: false,
    },
    {
      id: 16,
      titulo: 'Clases de atletismo',
      tipo: 'Bienes Físicos',
      categoria: 'deportes',
      imagen: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80',
      autor: 'Natalia B.',
      municipio: 'Villanueva',
      avatar: 'https://i.pravatar.cc/40?img=52',
      favorito: false,
    },

    // --- Videojuegos ---
    {
      id: 17,
      titulo: 'Pc Gamer',
      tipo: 'Electrónicos',
      categoria: 'videojuegos',
      imagen: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&q=80',
      autor: 'Esteban F.',
      municipio: 'Aguazul',
      avatar: 'https://i.pravatar.cc/40?img=7',
      favorito: false,
    },
    {
      id: 18,
      titulo: 'Control Xbox inalámbrico',
      tipo: 'Electrónicos',
      categoria: 'videojuegos',
      imagen: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600&q=80',
      autor: 'Paula V.',
      municipio: 'Paz de Ariporo',
      avatar: 'https://i.pravatar.cc/40?img=63',
      favorito: false,
    },
    {
      id: 19,
      titulo: 'Consolas Retro',
      tipo: 'Electrónicos',
      categoria: 'videojuegos',
      imagen: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80',
      autor: 'Tomás C.',
      municipio: 'Aguazul',
      avatar: 'https://i.pravatar.cc/40?img=20',
      favorito: false,
    },

    // --- Libros ---
    {
      id: 20,
      titulo: 'Colección de Libros',
      tipo: 'Bienes Físicos',
      categoria: 'libros',
      imagen: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80',
      autor: 'Sofía L.',
      municipio: 'Aguazul',
      avatar: 'https://i.pravatar.cc/40?img=41',
      favorito: false,
    },
    {
      id: 21,
      titulo: 'Libro de cocina gourmet',
      tipo: 'Bienes Físicos',
      categoria: 'libros',
      imagen: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&q=80',
      autor: 'Ricardo H.',
      municipio: 'Orocue',
      avatar: 'https://i.pravatar.cc/40?img=56',
      favorito: false,
    },
    {
      id: 22,
      titulo: 'Enciclopedia de historia',
      tipo: 'Bienes Físicos',
      categoria: 'libros',
      imagen: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80',
      autor: 'Alejandra Q.',
      municipio: 'Mani',
      avatar: 'https://i.pravatar.cc/40?img=14',
      favorito: false,
    },

    // --- Muebles ---
    {
      id: 23,
      titulo: 'Silla Amueblada',
      tipo: 'Bienes Físicos',
      categoria: 'muebles',
      imagen: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
      autor: 'Gustavo E.',
      municipio: 'Orocue',
      avatar: 'https://i.pravatar.cc/40?img=25',
      favorito: false,
    },
    {
      id: 24,
      titulo: 'Escritorio de oficina',
      tipo: 'Bienes Físicos',
      categoria: 'muebles',
      imagen: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
      autor: 'Lucía P.',
      municipio: 'Mani',
      avatar: 'https://i.pravatar.cc/40?img=48',
      favorito: false,
    },
    {
      id: 25,
      titulo: 'Sofa',
      tipo: 'Bienes Físicos',
      categoria: 'muebles',
      imagen: 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?w=600&q=80',
      autor: 'Diego S.',
      municipio: 'Paz de Ariporo',
      avatar: 'https://i.pravatar.cc/40?img=9',
      favorito: false,
    },

    // --- Juguetes ---
    {
      id: 26,
      titulo: 'Lego Star Wars',
      tipo: 'Bienes Físicos',
      categoria: 'juguetes',
      imagen: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&q=80',
      autor: 'Mariana G.',
      municipio: 'Monterrey',
      avatar: 'https://i.pravatar.cc/40?img=32',
      favorito: false,
    },
    {
      id: 27,
      titulo: 'Jueguetes de Mario',
      tipo: 'Bienes Físicos',
      categoria: 'juguetes',
      imagen: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&q=80',
      autor: 'Nicolás F.',
      municipio: 'Villanueva',
      avatar: 'https://i.pravatar.cc/40?img=58',
      favorito: false,
    },
    {
      id: 28,
      titulo: 'Pista de tren eléctrica',
      tipo: 'Bienes Físicos',
      categoria: 'juguetes',
      imagen: 'https://images.unsplash.com/photo-1558877385-81a1c7e67d72?w=600&q=80',
      autor: 'Sara J.',
      municipio: 'Villanueva',
      avatar: 'https://i.pravatar.cc/40?img=4',
      favorito: false,
    },

    // --- Digitales (pestaña "Digitales") ---
    {
      id: 29,
      titulo: 'Desarrollo de páginas web',
      tipo: 'Servicios',
      categoria: 'digitales',
      imagen: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80',
      autor: 'Diego C.',
      municipio: 'Yopal',
      avatar: 'https://i.pravatar.cc/40?img=8',
      favorito: false,
    },
    {
      id: 30,
      titulo: 'Diseño de logo e identidad',
      tipo: 'Servicios',
      categoria: 'digitales',
      imagen: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80',
      autor: 'Verónica A.',
      municipio: 'Tauramena',
      avatar: 'https://i.pravatar.cc/40?img=45',
      favorito: false,
    },
    {
      id: 31,
      titulo: 'Clases de inglés online',
      tipo: 'Servicios',
      categoria: 'digitales',
      imagen: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80',
      autor: 'Camilo R.',
      municipio: 'Yopal',
      avatar: 'https://i.pravatar.cc/40?img=61',
      favorito: false,
    },
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

  ngOnInit(): void {
    this.cargarFavoritosGuardados();
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
          t.municipio.toLowerCase().includes(termino),
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
    trueque.favorito = !trueque.favorito;
    this.guardarFavoritos();
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

  /** Persistencia de favoritos en localStorage, tolerante a errores */
  private guardarFavoritos(): void {
    try {
      const idsFavoritos = this.trueques.filter((t) => t.favorito).map((t) => t.id);
      localStorage.setItem(CLAVE_FAVORITOS, JSON.stringify(idsFavoritos));
    } catch {
      // localStorage no disponible (modo incógnito, SSR, etc.) — se ignora sin romper la app
    }
  }

  private cargarFavoritosGuardados(): void {
    try {
      const guardado = localStorage.getItem(CLAVE_FAVORITOS);
      if (!guardado) {
        return;
      }
      const idsFavoritos: number[] = JSON.parse(guardado);
      this.trueques.forEach((t) => {
        t.favorito = idsFavoritos.includes(t.id);
      });
    } catch {
      // Si el JSON está corrupto o localStorage no existe, simplemente arrancamos sin favoritos
    }
  }
}
