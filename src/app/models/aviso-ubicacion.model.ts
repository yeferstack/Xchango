// Aviso que se muestra en el selector de ubicación del sidebar
// (data/avisos-ubicacion.json).
// Es solo para ver: no se guarda, no se marca como leído y no genera acciones.
// Cuando exista la API, este dato saldría del servidor según el municipio.
export interface AvisoUbicacion {
  id: string;
  // Municipio al que corresponde. Vacío = mensaje por defecto.
  municipio: string;
  titulo: string;
  mensaje: string;
  icono: string;
}
