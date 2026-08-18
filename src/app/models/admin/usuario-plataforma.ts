export interface UsuarioPlataforma {
  id: string;
  nombre: string;
  email: string;
  estado: 'activo' | 'suspendido' | 'advertido';
  fechaRegistro: string;
  publicaciones: number;
  intercambios: number;
  reportes: number;
  ubicacion: string;
  nivelActividad: 'bajo' | 'medio' | 'alto';
}