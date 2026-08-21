import { Injectable } from '@angular/core';
import { Trueque } from '../models/trueque.model';

const CLAVE_FAVORITOS = 'xchango_favoritos';

@Injectable({ providedIn: 'root' })
export class TruequesService {
  trueques: Trueque[] = [
    // --- Electrónicos ---
    {
      id: 1,
      titulo: 'iPhone 13 \\ 128GB',
      tipo: 'Electrónicos',
      categoria: 'electronicos',
      imagen: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=600&q=80',
      autor: 'Juan P.',
      ciudad: 'Yopal',
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
      ciudad: 'Aguazul',
      avatar: 'https://i.pravatar.cc/40?img=33',
      favorito: false,
    },
    {
      id: 3,
      titulo: 'Audifonos Bluetooth',
      tipo: 'Electrónicos',
      categoria: 'electronicos',
      imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
      autor: 'Santiago P.',
      ciudad: 'Yopal',
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
      ciudad: 'Aguazul',
      avatar: 'https://i.pravatar.cc/40?img=22',
      favorito: false,
    },

    // --- Vehículos ---
    {
      id: 5,
      titulo: 'Nissan GT-R 3.8 Premium Edition',
      tipo: 'Vehículos',
      categoria: 'vehiculos',
      imagen: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80',
      autor: 'Andrés V.',
      ciudad: 'Envigado',
      avatar: 'https://i.pravatar.cc/40?img=15',
      favorito: false,
      anio: 2013,
      publicadoHace: 'Publicado hace 36 días',
      caracteristicas: [
        { label: 'Color', valor: 'Azul Rey' },
        { label: 'Material', valor: 'Acero y aluminio' },
        { label: 'Motor', valor: '3.8L' },
        { label: 'Kilometraje', valor: '17.293 km' },
      ],
      descripcion:
        'Nissan GT-R en excelente estado, motor 3.8, transmisión automática, combustible gasolina.',
      interesesCambio: [
        'Vehículos deportivos de alta gama (BMW M4, Mercedes-AMG C63, Audi RS5)',
        'Camionetas de lujo (Toyota Prado, Mazda CX-9 Signature)',
        'Apartamento o lote en buena zona',
        'Local comercial',
      ],
    },
    {
      id: 6,
      titulo: 'Pulsar NS 200',
      tipo: 'Vehículos',
      categoria: 'vehiculos',
      imagen: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&q=80',
      autor: 'Mateo L.',
      ciudad: 'Yopal',
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
      ciudad: 'Yopal',
      avatar: 'https://i.pravatar.cc/40?img=5',
      favorito: false,
    },

    // --- Ropa ---
    {
      id: 8,
      titulo: 'Chaqueta de cuero',
      tipo: 'Bienes Físicos',
      categoria: 'ropa',
      imagen: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
      autor: 'Daniela M.',
      ciudad: 'Aguazul',
      avatar: 'https://i.pravatar.cc/40?img=60',
      favorito: false,
    },
    {
      id: 9,
      titulo: 'Zapatillas Nike Air',
      tipo: 'Bienes Físicos',
      categoria: 'ropa',
      imagen: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80',
      autor: 'Julián R.',
      ciudad: 'Cartagena',
      avatar: 'https://i.pravatar.cc/40?img=18',
      favorito: false,
    },
    {
      id: 10,
      titulo: 'Vestido de fiesta',
      tipo: 'Bienes Físicos',
      categoria: 'ropa',
      imagen: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80',
      autor: 'Manuela S.',
      ciudad: 'Manizales',
      avatar: 'https://i.pravatar.cc/40?img=29',
      favorito: false,
    },

    // --- Hogar ---
    {
      id: 11,
      titulo: 'Servicio de albañileria',
      tipo: 'Servicios',
      categoria: 'hogar',
      imagen: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80',
      autor: 'Carlos M.',
      ciudad: 'Aguazul',
      avatar: 'https://i.pravatar.cc/40?img=44',
      favorito: false,
    },
    {
      id: 12,
      titulo: 'Servicio de jardineria',
      tipo: 'Servicios',
      categoria: 'hogar',
      imagen: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
      autor: 'Laura G.',
      ciudad: 'Cali',
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
      ciudad: 'Cúcuta',
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
      ciudad: 'Ibagué',
      avatar: 'https://i.pravatar.cc/40?img=10',
      favorito: false,
    },
    {
      id: 15,
      titulo: 'Balon de baloncesto oficial',
      tipo: 'Bienes Físicos',
      categoria: 'deportes',
      imagen: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80',
      autor: 'Kevin O.',
      ciudad: 'Neiva',
      avatar: 'https://i.pravatar.cc/40?img=37',
      favorito: false,
    },
    {
      id: 16,
      titulo: 'Set de pesas ajustables',
      tipo: 'Bienes Físicos',
      categoria: 'deportes',
      imagen: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80',
      autor: 'Natalia B.',
      ciudad: 'Santa Marta',
      avatar: 'https://i.pravatar.cc/40?img=52',
      favorito: false,
    },

    // --- Videojuegos ---
    {
      id: 17,
      titulo: 'PlayStation 5',
      tipo: 'Electrónicos',
      categoria: 'videojuegos',
      imagen: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&q=80',
      autor: 'Esteban F.',
      ciudad: 'Armenia',
      avatar: 'https://i.pravatar.cc/40?img=7',
      favorito: false,
    },
    {
      id: 18,
      titulo: 'Control Xbox inalambrico',
      tipo: 'Electrónicos',
      categoria: 'videojuegos',
      imagen: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600&q=80',
      autor: 'Paula V.',
      ciudad: 'Popayán',
      avatar: 'https://i.pravatar.cc/40?img=63',
      favorito: false,
    },
    {
      id: 19,
      titulo: 'Nintendo Switch OLED',
      tipo: 'Electrónicos',
      categoria: 'videojuegos',
      imagen: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80',
      autor: 'Tomás C.',
      ciudad: 'Yopal',
      avatar: 'https://i.pravatar.cc/40?img=20',
      favorito: false,
    },

    // --- Libros ---
    {
      id: 20,
      titulo: 'Colección Harry Potter',
      tipo: 'Bienes Físicos',
      categoria: 'libros',
      imagen: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80',
      autor: 'Sofía L.',
      ciudad: 'Bogotá',
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
      ciudad: 'Medellín',
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
      ciudad: 'Cali',
      avatar: 'https://i.pravatar.cc/40?img=14',
      favorito: false,
    },

    // --- Muebles ---
    {
      id: 23,
      titulo: 'Comedor de 6 puestos',
      tipo: 'Bienes Físicos',
      categoria: 'muebles',
      imagen: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
      autor: 'Gustavo E.',
      ciudad: 'Bucaramanga',
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
      ciudad: 'Cartagena',
      avatar: 'https://i.pravatar.cc/40?img=48',
      favorito: false,
    },
    {
      id: 25,
      titulo: 'Cama doble con colchon',
      tipo: 'Bienes Físicos',
      categoria: 'muebles',
      imagen: 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?w=600&q=80',
      autor: 'Diego S.',
      ciudad: 'Pereira',
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
      ciudad: 'Bogotá',
      avatar: 'https://i.pravatar.cc/40?img=32',
      favorito: false,
    },
    {
      id: 27,
      titulo: 'Peluche gigante',
      tipo: 'Bienes Físicos',
      categoria: 'juguetes',
      imagen: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&q=80',
      autor: 'Nicolás F.',
      ciudad: 'Envigado',
      avatar: 'https://i.pravatar.cc/40?img=58',
      favorito: false,
    },
    {
      id: 28,
      titulo: 'Pista de carros electrica',
      tipo: 'Bienes Físicos',
      categoria: 'juguetes',
      imagen: 'https://images.unsplash.com/photo-1558877385-81a1c7e67d72?w=600&q=80',
      autor: 'Sara J.',
      ciudad: 'Cali',
      avatar: 'https://i.pravatar.cc/40?img=4',
      favorito: false,
    },

    // --- Digitales (pestaña "Digitales") ---
    {
      id: 29,
      titulo: 'Desarrollo de paginas web',
      tipo: 'Servicios',
      categoria: 'digitales',
      imagen: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80',
      autor: 'Diego C.',
      ciudad: 'Bogotá',
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
      ciudad: 'Medellín',
      avatar: 'https://i.pravatar.cc/40?img=45',
      favorito: false,
    },
    {
      id: 31,
      titulo: 'Clases de ingles online',
      tipo: 'Servicios',
      categoria: 'digitales',
      imagen: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80',
      autor: 'Camilo R.',
      ciudad: 'Yopal',
      avatar: 'https://i.pravatar.cc/40?img=61',
      favorito: false,
    },
  ];

  constructor() {
    this.cargarFavoritosGuardados();
  }

  /** Busca un trueque por su id. Usado por la página de detalle según el parámetro de ruta. */
  obtenerPorId(id: number): Trueque | undefined {
    return this.trueques.find((t) => t.id === id);
  }

  alternarFavorito(trueque: Trueque): void {
    trueque.favorito = !trueque.favorito;
    this.guardarFavoritos();
  }

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
