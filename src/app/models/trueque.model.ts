export interface Trueque {
  id: number;
  titulo: string;
  tipo: 'Electrónicos' | 'Servicios' | 'Bienes Físicos' | 'Vehículos' | 'Digitales';
  categoria: string;
  imagen: string;
  autor: string;
  ciudad: string;
  avatar: string;
  favorito: boolean;
  // --- Campos opcionales para el modal de detalle ---
  imagenes?: string[];
  anio?: number;
  publicadoHace?: string;
  descripcion?: string;
  caracteristicas?: { label: string; valor: string }[];
  interesesCambio?: string[];
}