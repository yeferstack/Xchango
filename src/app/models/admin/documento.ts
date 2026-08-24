/**
 * Documento de identidad que sube un usuario para verificar su cuenta
 * (data/documentos.json).
 *
 * Como todavía no hay backend, el archivo se guarda solo como nombre; cuando
 * exista la API ahí irá la URL real de la imagen.
 */
export type EstadoDocumento = 'pendiente' | 'aprobado' | 'rechazado';

export interface Documento {
  id: string;
  usuarioId: string;
  tipoDocumento: string;
  numero: string;
  archivo: string;
  fechaSubida: string;
  estado: EstadoDocumento;
  /** Motivo del rechazo o comentario del revisor. */
  observacion: string;
  /** Id del administrador que lo revisó. null si nadie lo ha revisado. */
  revisadoPor: string | null;
}

/** Documento con el nombre del usuario y del revisor ya resueltos. */
export interface DocumentoVista extends Documento {
  usuarioNombre: string;
  usuarioEmail: string;
  usuarioAvatar: string;
  revisorNombre: string;
}
