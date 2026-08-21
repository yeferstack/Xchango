import { Injectable } from '@angular/core';
import { Trueque } from '../models/trueque.model';

const CLAVE_FAVORITOS = 'xchango_favoritos';

@Injectable({ providedIn: 'root' })
export class TruequesService {
  trueques: Trueque[] = [
    // --- Electronicos ---
    {
      id: 1,
      titulo: 'iPhone 13 \\ 128GB',
      tipo: 'Electronicos',
      categoria: 'electronicos',
      imagen: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=600&h=450&fit=crop&q=80',
      imagenes: ['https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=450&fit=crop&q=80'],
      autor: 'Juan P.',
      ciudad: 'Yopal',
      avatar: 'https://i.pravatar.cc/40?img=12',
      favorito: false,
    },
    {
      id: 2,
      titulo: 'MacBook Pro 14"',
      tipo: 'Electronicos',
      categoria: 'electronicos',
      imagen: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=450&fit=crop&q=80',
      imagenes: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&h=450&fit=crop&q=80'],
      autor: 'Valentina R.',
      ciudad: 'Aguazul',
      avatar: 'https://i.pravatar.cc/40?img=33',
      favorito: false,
    },
    {
      id: 3,
      titulo: 'Audifonos Bluetooth',
      tipo: 'Electronicos',
      categoria: 'electronicos',
      imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=450&fit=crop&q=80',
      imagenes: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=450&fit=crop&q=80'],
      autor: 'Santiago P.',
      ciudad: 'Villanueva',
      avatar: 'https://i.pravatar.cc/40?img=47',
      favorito: false,
    },
    {
      id: 4,
      titulo: 'Smartwatch Serie 8',
      tipo: 'Electronicos',
      categoria: 'electronicos',
      imagen: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=450&fit=crop&q=80',
      imagenes: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&h=450&fit=crop&q=80'],
      autor: 'Camila T.',
      ciudad: 'Tauramena',
      avatar: 'https://i.pravatar.cc/40?img=22',
      favorito: false,
    },

    // --- Vehiculos ---
    {
      id: 5,
      titulo: 'Nissan GT-R 3.8 Premium Edition',
      tipo: 'Vehiculos',
      categoria: 'vehiculos',
      imagen: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=450&fit=crop&q=80',
      imagenes: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=450&fit=crop&q=80'],
      autor: 'Andrés V.',
      ciudad: 'Monterrey',
      avatar: 'https://i.pravatar.cc/40?img=15',
      favorito: false,
      anio: 2013,
      publicadoHace: 'Publicado hace 36 días',
      caracteristicas: [
        { label: 'Marca', valor: 'Nissan' },
        { label: 'Modelo', valor: 'GT-R' },
        { label: 'Año', valor: '2013' },
        { label: 'Versión', valor: 'Premium Edition' },
        { label: 'Puertas', valor: '2' },
        { label: 'Transmisión', valor: 'Automática' },
        { label: 'Kilómetros', valor: '17.293 km' },
        { label: 'Tipo de combustible', valor: 'Gasolina' },
        { label: 'Color', valor: 'Azul Rey' },
      ],
      descripcion:
        'Nissan GT-R en excelente estado, motor 3.8, transmisión automática, combustible gasolina.',
      descripcionDetallada:
        'GT-R Marca: Nissan Año: 2013 Motor: 3.8L V6 Twin-Turbo, 545 HP Tipo de combustible: Gasolina Capacidad: 4 Kilometraje: 17.293 km Transmisión: Automática de doble embrague (DCT) de 6 velocidades con levas. Otros: Suspensión independiente Bilstein DampTronic, dirección asistida hidráulica de relación variable, modos de manejo Normal, R-Mode y Save, frenos Brembo ventilados con discos ranurados, control de estabilidad (VDC-R), aire acondicionado automático bizona, encendido electrónico (Push Start) con llave inteligente, volante multifunción en cuero con levas de cambio, asientos deportivos en cuero/alcántara con ajuste eléctrico, pantalla multifunción con medidores de desempeño, sistema de sonido Bluetooth/USB/AUX, cámara de reversa + sensores de parqueo, airbags frontales y laterales, luces delanteras con encendido automático, rines deportivos, escape deportivo, interior en cuero/alcántara.',
      interesesCambio: [
        'Vehiculos deportivos de alta gama (BMW M4, Mercedes-AMG C63, Audi RS5)',
        'Camionetas de lujo (Toyota Prado, Mazda CX-9 Signature)',
        'Apartamento o lote en buena zona',
        'Local comercial',
      ],
    },
    {
      id: 6,
      titulo: 'Pulsar NS 200',
      tipo: 'Vehiculos',
      categoria: 'vehiculos',
      imagen: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&h=450&fit=crop&q=80',
      imagenes: ['https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1449426468159-d96dbf08f231?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1449965408869-3cdcc80e5c6f?w=600&h=450&fit=crop&q=80'],
      autor: 'Mateo L.',
      ciudad: 'Paz de Ariporo',
      avatar: 'https://i.pravatar.cc/40?img=51',
      favorito: false,
      anio: 2021,
      publicadoHace: 'Publicado hace 12 días',
      caracteristicas: [
        { label: 'Marca', valor: 'Bajaj' },
        { label: 'Modelo', valor: 'Pulsar NS 200' },
        { label: 'Año', valor: '2021' },
        { label: 'Cilindraje', valor: '199.5 cc' },
        { label: 'Transmisión', valor: 'Manual 6 velocidades' },
        { label: 'Kilómetros', valor: '9.800 km' },
        { label: 'Tipo de combustible', valor: 'Gasolina' },
        { label: 'Color', valor: 'Negro mate' },
      ],
      descripcion:
        'Pulsar NS 200 en muy buen estado, motor refrigerado por líquido, papeles al día.',
      descripcionDetallada:
        'Pulsar NS 200 Marca: Bajaj Año: 2021 Motor: monocilíndrico 199.5cc refrigerado por líquido, 24.5 HP Tipo de combustible: Gasolina Transmisión: manual de 6 velocidades. Otros: frenos de disco delantero y trasero con ABS dual channel, suspensión delantera telescópica y trasera monoshock Nitrox, tablero digital con indicador de marcha, luces full LED, llantas radiales, chasis perimetral, SOAT y tecnomecánica vigentes, mantenimientos al día con soportes de taller autorizado, único dueño.',
      interesesCambio: [
        'Motos de mayor cilindraje',
        'Bicicletas de montaña de gama alta',
        'Electrodomésticos o Electronicos de valor equivalente',
        'Abierto a propuestas',
      ],
    },
    {
      id: 7,
      titulo: 'Camioneta Toyota Hilux',
      tipo: 'Vehiculos',
      categoria: 'vehiculos',
      imagen: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&h=450&fit=crop&q=80',
      imagenes: ['https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1571127236794-81c0bbfe1ce3?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?w=600&h=450&fit=crop&q=80'],
      autor: 'Felipe A.',
      ciudad: 'Yopal',
      avatar: 'https://i.pravatar.cc/40?img=5',
      favorito: false,
      anio: 2019,
      publicadoHace: 'Publicado hace 8 días',
      caracteristicas: [
        { label: 'Marca', valor: 'Toyota' },
        { label: 'Modelo', valor: 'Hilux' },
        { label: 'Año', valor: '2019' },
        { label: 'Versión', valor: '4x4 Diesel' },
        { label: 'Puertas', valor: '4' },
        { label: 'Transmisión', valor: 'Manual' },
        { label: 'Kilómetros', valor: '68.400 km' },
        { label: 'Tipo de combustible', valor: 'Diésel' },
        { label: 'Color', valor: 'Blanco' },
      ],
      descripcion:
        'Toyota Hilux 4x4 diésel, ideal para trabajo de campo, motor 2.4, tracción 4x4 en excelente estado.',
      descripcionDetallada:
        'Hilux Marca: Toyota Año: 2019 Motor: 2.4L turbo diésel, 150 HP Tipo de combustible: Diésel Tracción: 4x4 con reductora Transmisión: manual de 6 velocidades. Otros: caja de estacas en platón, control de descenso en pendientes, control de estabilidad, cámara de reversa, aire acondicionado, dirección asistida, vidrios eléctricos, radio con Bluetooth, llantas todo terreno, barras antivuelco, gancho de arrastre, mantenimientos al día en concesionario autorizado, SOAT y tecnomecánica vigentes.',
      interesesCambio: [
        'Camioneta o vehículo de menor valor + efectivo',
        'Maquinaria agrícola',
        'Lote o finca en Casanare',
        'Abierto a propuestas',
      ],
    },

    // --- Ropa ---
    {
      id: 8,
      titulo: 'Chaqueta de cuero',
      tipo: 'Bienes Fisicos',
      categoria: 'ropa',
      imagen: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=450&fit=crop&q=80',
      imagenes: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=450&fit=crop&q=80'],
      autor: 'Daniela M.',
      ciudad: 'Maní',
      avatar: 'https://i.pravatar.cc/40?img=60',
      favorito: false,
    },
    {
      id: 9,
      titulo: 'Zapatillas Nike Air',
      tipo: 'Bienes Fisicos',
      categoria: 'ropa',
      imagen: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=450&fit=crop&q=80',
      imagenes: ['https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=450&fit=crop&q=80'],
      autor: 'Julián R.',
      ciudad: 'Orocué',
      avatar: 'https://i.pravatar.cc/40?img=18',
      favorito: false,
    },
    {
      id: 10,
      titulo: 'Vestido de fiesta',
      tipo: 'Bienes Fisicos',
      categoria: 'ropa',
      imagen: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=450&fit=crop&q=80',
      imagenes: ['https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&h=450&fit=crop&q=80'],
      autor: 'Manuela S.',
      ciudad: 'Pore',
      avatar: 'https://i.pravatar.cc/40?img=29',
      favorito: false,
    },

    // --- Hogar ---
    {
      id: 11,
      titulo: 'Servicio de albañileria',
      tipo: 'Servicios',
      categoria: 'hogar',
      imagen: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=450&fit=crop&q=80',
      imagenes: ['https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1590986037557-4e3f5cf3e8b8?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=600&h=450&fit=crop&q=80'],
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
      imagen: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=450&fit=crop&q=80',
      imagenes: ['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1466692476868-9ee5a3a3e93b?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=600&h=450&fit=crop&q=80'],
      autor: 'Laura G.',
      ciudad: 'Sabanalarga',
      avatar: 'https://i.pravatar.cc/40?img=3',
      favorito: false,
    },
    {
      id: 13,
      titulo: 'Juego de sala 3 puestos',
      tipo: 'Bienes Fisicos',
      categoria: 'hogar',
      imagen: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&h=450&fit=crop&q=80',
      imagenes: ['https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1550254478-ead40cc54513?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1567538096631-e0c55bd6374c?w=600&h=450&fit=crop&q=80'],
      autor: 'Isabel N.',
      ciudad: 'Yopal',
      avatar: 'https://i.pravatar.cc/40?img=66',
      favorito: false,
    },

    // --- Deportes ---
    {
      id: 14,
      titulo: 'Bicicleta de montaña',
      tipo: 'Bienes Fisicos',
      categoria: 'deportes',
      imagen: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&h=450&fit=crop&q=80',
      imagenes: ['https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1553978297-833d09932d31?w=600&h=450&fit=crop&q=80'],
      autor: 'Óscar D.',
      ciudad: 'Hato Corozal',
      avatar: 'https://i.pravatar.cc/40?img=10',
      favorito: false,
    },
    {
      id: 15,
      titulo: 'Balon de baloncesto oficial',
      tipo: 'Bienes Fisicos',
      categoria: 'deportes',
      imagen: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=450&fit=crop&q=80',
      imagenes: ['https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1552667466-07770ae110d0?w=600&h=450&fit=crop&q=80'],
      autor: 'Kevin O.',
      ciudad: 'Nunchía',
      avatar: 'https://i.pravatar.cc/40?img=37',
      favorito: false,
    },
    {
      id: 16,
      titulo: 'Set de pesas ajustables',
      tipo: 'Bienes Fisicos',
      categoria: 'deportes',
      imagen: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=450&fit=crop&q=80',
      imagenes: ['https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&h=450&fit=crop&q=80'],
      autor: 'Natalia B.',
      ciudad: 'Villanueva',
      avatar: 'https://i.pravatar.cc/40?img=52',
      favorito: false,
    },

    // --- Videojuegos ---
    {
      id: 17,
      titulo: 'PlayStation 5',
      tipo: 'Electronicos',
      categoria: 'videojuegos',
      imagen: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&h=450&fit=crop&q=80',
      imagenes: ['https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600&h=450&fit=crop&q=80'],
      autor: 'Esteban F.',
      ciudad: 'Yopal',
      avatar: 'https://i.pravatar.cc/40?img=7',
      favorito: false,
    },
    {
      id: 18,
      titulo: 'Control Xbox inalambrico',
      tipo: 'Electronicos',
      categoria: 'videojuegos',
      imagen: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600&h=450&fit=crop&q=80',
      imagenes: ['https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1580327344181-c1163234e5a0?w=600&h=450&fit=crop&q=80'],
      autor: 'Paula V.',
      ciudad: 'Chámeza',
      avatar: 'https://i.pravatar.cc/40?img=63',
      favorito: false,
    },
    {
      id: 19,
      titulo: 'Nintendo Switch OLED',
      tipo: 'Electronicos',
      categoria: 'videojuegos',
      imagen: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=450&fit=crop&q=80',
      imagenes: ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1611242320939-49546cec2b1f?w=600&h=450&fit=crop&q=80'],
      autor: 'Tomás C.',
      ciudad: 'Tauramena',
      avatar: 'https://i.pravatar.cc/40?img=20',
      favorito: false,
    },

    // --- Libros ---
    {
      id: 20,
      titulo: 'Colección Harry Potter',
      tipo: 'Bienes Fisicos',
      categoria: 'libros',
      imagen: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=450&fit=crop&q=80',
      imagenes: ['https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=600&h=450&fit=crop&q=80'],
      autor: 'Sofía L.',
      ciudad: 'Yopal',
      avatar: 'https://i.pravatar.cc/40?img=41',
      favorito: false,
    },
    {
      id: 21,
      titulo: 'Libro de cocina gourmet',
      tipo: 'Bienes Fisicos',
      categoria: 'libros',
      imagen: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&h=450&fit=crop&q=80',
      imagenes: ['https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=600&h=450&fit=crop&q=80'],
      autor: 'Ricardo H.',
      ciudad: 'Monterrey',
      avatar: 'https://i.pravatar.cc/40?img=56',
      favorito: false,
    },
    {
      id: 22,
      titulo: 'Enciclopedia de historia',
      tipo: 'Bienes Fisicos',
      categoria: 'libros',
      imagen: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=450&fit=crop&q=80',
      imagenes: ['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1533327325824-76bc4e62d1b6?w=600&h=450&fit=crop&q=80'],
      autor: 'Alejandra Q.',
      ciudad: 'Aguazul',
      avatar: 'https://i.pravatar.cc/40?img=14',
      favorito: false,
    },

    // --- Muebles ---
    {
      id: 23,
      titulo: 'Comedor de 6 puestos',
      tipo: 'Bienes Fisicos',
      categoria: 'muebles',
      imagen: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=450&fit=crop&q=80',
      imagenes: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1617104551722-3b2d51366400?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&h=450&fit=crop&q=80'],
      autor: 'Gustavo E.',
      ciudad: 'Recetor',
      avatar: 'https://i.pravatar.cc/40?img=25',
      favorito: false,
    },
    {
      id: 24,
      titulo: 'Escritorio de oficina',
      tipo: 'Bienes Fisicos',
      categoria: 'muebles',
      imagen: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=450&fit=crop&q=80',
      imagenes: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1519974719765-e6559eac2b6c?w=600&h=450&fit=crop&q=80'],
      autor: 'Lucía P.',
      ciudad: 'Villanueva',
      avatar: 'https://i.pravatar.cc/40?img=48',
      favorito: false,
    },
    {
      id: 25,
      titulo: 'Cama doble con colchon',
      tipo: 'Bienes Fisicos',
      categoria: 'muebles',
      imagen: 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?w=600&h=450&fit=crop&q=80',
      imagenes: ['https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1616627561950-9f746e330187?w=600&h=450&fit=crop&q=80'],
      autor: 'Diego S.',
      ciudad: 'Yopal',
      avatar: 'https://i.pravatar.cc/40?img=9',
      favorito: false,
    },

    // --- Juguetes ---
    {
      id: 26,
      titulo: 'Lego Star Wars',
      tipo: 'Bienes Fisicos',
      categoria: 'juguetes',
      imagen: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&h=450&fit=crop&q=80',
      imagenes: ['https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1560961911-ba7ef651a56c?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=600&h=450&fit=crop&q=80'],
      autor: 'Mariana G.',
      ciudad: 'Támara',
      avatar: 'https://i.pravatar.cc/40?img=32',
      favorito: false,
    },
    {
      id: 27,
      titulo: 'Peluche gigante',
      tipo: 'Bienes Fisicos',
      categoria: 'juguetes',
      imagen: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&h=450&fit=crop&q=80',
      imagenes: ['https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1562180804-b0730fc0c73f?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?w=600&h=450&fit=crop&q=80'],
      autor: 'Nicolás F.',
      ciudad: 'Sácama',
      avatar: 'https://i.pravatar.cc/40?img=58',
      favorito: false,
    },
    {
      id: 28,
      titulo: 'Pista de carros electrica',
      tipo: 'Bienes Fisicos',
      categoria: 'juguetes',
      imagen: 'https://images.unsplash.com/photo-1558877385-81a1c7e67d72?w=600&h=450&fit=crop&q=80',
      imagenes: ['https://images.unsplash.com/photo-1558877385-81a1c7e67d72?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1600661653561-629509216228?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=600&h=450&fit=crop&q=80'],
      autor: 'Sara J.',
      ciudad: 'San Luis de Palenque',
      avatar: 'https://i.pravatar.cc/40?img=4',
      favorito: false,
    },

    // --- Digitales (pestaña "Digitales") ---
    {
      id: 29,
      titulo: 'Desarrollo de paginas web',
      tipo: 'Servicios',
      categoria: 'digitales',
      imagen: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=450&fit=crop&q=80',
      imagenes: ['https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=450&fit=crop&q=80'],
      autor: 'Diego C.',
      ciudad: 'Yopal',
      avatar: 'https://i.pravatar.cc/40?img=8',
      favorito: false,
    },
    {
      id: 30,
      titulo: 'Diseño de logo e identidad',
      tipo: 'Servicios',
      categoria: 'digitales',
      imagen: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=450&fit=crop&q=80',
      imagenes: ['https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1626785774625-0b1c2c4eae1e?w=600&h=450&fit=crop&q=80'],
      autor: 'Verónica A.',
      ciudad: 'Trinidad',
      avatar: 'https://i.pravatar.cc/40?img=45',
      favorito: false,
    },
    {
      id: 31,
      titulo: 'Clases de ingles online',
      tipo: 'Servicios',
      categoria: 'digitales',
      imagen: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=450&fit=crop&q=80',
      imagenes: ['https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=450&fit=crop&q=80'],
      autor: 'Camilo R.',
      ciudad: 'Paz de Ariporo',
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
