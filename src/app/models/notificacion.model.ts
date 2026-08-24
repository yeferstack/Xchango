/**
 * Aviso de un trueque (data/notificaciones.json).
 *
 * ESTO NO ES UN CHAT. No hay emisor, ni hilo, ni respuesta, ni conversación
 * almacenada: es un aviso de una sola vía que le dice al usuario que ocurrió
 * algo. La negociación real sigue ocurriendo en WhatsApp.
 *
 * `alertas.json` no servía para esto: es del panel admin y no tiene usuarioId.
 */
export type TipoNotificacion =
  | 'solicitud'   // alguien quiere truequear con una publicación tuya
  | 'aceptada'    // el dueño aceptó tu propuesta
  | 'rechazada';  // el dueño no aceptó tu propuesta  

export interface Notificacion {
  id: string;
  /** Destinatario del aviso. */
  usuarioId: string;
  tipo: TipoNotificacion;
  titulo: string;
  mensaje: string;
  /** ID del trueque o publicación relacionada. null si el aviso es general. */
  referenciaId: string | null;
  leida: boolean;
  fecha: string;
}
