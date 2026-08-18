export interface PublicacionReportada {
  id: string;
  titulo: string;
  usuarioId: string;
  usuarioNombre: string;
  categoria: string;
  fecha: string;
  motivo: string;
  estado: 'pendiente' | 'aprobada' | 'eliminada';
  gravedad: 'baja' | 'media' | 'alta';
}