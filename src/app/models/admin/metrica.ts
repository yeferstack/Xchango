export interface Metrica {
  usuarios: number;
  publicaciones: number;
  intercambios: number;
  usuariosActivos: number;
  publicacionesReportadas: number;
  usuariosSuspendidos: number;
}

export interface SerieGrafico {
  label: string;
  valor: number;
}

export interface Comparativa {
  actual: number;
  anterior: number;
  porcentaje: number;
}