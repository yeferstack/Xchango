import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface PublicacionReportada {
  id: string;
  titulo: string;
  usuarioId: string;
  usuarioNombre: string;
  motivo: string;
  fecha: string;
  estado: 'pendiente' | 'aprobada' | 'eliminada';
  gravedad: 'baja' | 'media' | 'alta';
  categoria: string;
}

export interface PublicacionEliminada {
  id: string;
  titulo: string;
  usuarioNombre: string;
  motivo: string;
  fecha: string;
  administrador: string;
}

@Injectable({
  providedIn: 'root',
})
export class PublicacionesAdminService {
  private readonly http = inject(HttpClient);
  private readonly _reportadas = signal<PublicacionReportada[]>([]);
  private readonly _eliminadas = signal<PublicacionEliminada[]>([]);
  private readonly _cargando = signal(false);
  private readonly _error = signal<string | null>(null);
  private cargado = false;

  readonly reportadas = this._reportadas.asReadonly();
  readonly eliminadas = this._eliminadas.asReadonly();
  readonly cargando = this._cargando.asReadonly();
  readonly error = this._error.asReadonly();
  readonly pendientes = computed(() => this._reportadas().filter(p => p.estado === 'pendiente').length);

  cargar(): void {
    if (this.cargado) return;
    this.cargado = true;
    this._cargando.set(true);
    this.http.get<PublicacionReportada[]>('/data/publicaciones-reportadas.json').subscribe({
      next: datos => { this._reportadas.set(datos); this._cargando.set(false); this.cargarEliminadas(); },
      error: () => { this.cargado = false; this._error.set('No se pudieron cargar las publicaciones reportadas.'); this._cargando.set(false); },
    });
  }

  motivos(): string[] { return [...new Set(this._reportadas().map(p => p.motivo))].sort(); }
  categorias(): string[] { return [...new Set(this._reportadas().map(p => p.categoria))].sort(); }

  filtrar(f: { motivo?: string; estado?: PublicacionReportada['estado'] | 'todos'; gravedad?: PublicacionReportada['gravedad'] | 'todas'; categoria?: string }): PublicacionReportada[] {
    return this._reportadas().filter(p =>
      (!f.motivo || f.motivo === 'todos' || p.motivo === f.motivo) &&
      (!f.estado || f.estado === 'todos' || p.estado === f.estado) &&
      (!f.gravedad || f.gravedad === 'todas' || p.gravedad === f.gravedad) &&
      (!f.categoria || f.categoria === 'todas' || p.categoria === f.categoria)
    );
  }

  aprobar(id: string): void { this.actualizarEstado(id, 'aprobada'); }

  eliminar(id: string, motivo: string, administrador: string): void {
    const publicacion = this._reportadas().find(p => p.id === id);
    if (!publicacion) return;
    this.actualizarEstado(id, 'eliminada');
    this._eliminadas.update(lista => [{ id, titulo: publicacion.titulo, usuarioNombre: publicacion.usuarioNombre, motivo, fecha: new Date().toISOString(), administrador }, ...lista]);
  }

  private actualizarEstado(id: string, estado: PublicacionReportada['estado']): void {
    this._reportadas.update(lista => lista.map(p => p.id === id ? { ...p, estado } : p));
  }

  private cargarEliminadas(): void {
    this.http.get<PublicacionEliminada[]>('/data/publicaciones-eliminadas.json').subscribe({
      next: datos => this._eliminadas.set(datos),
      error: () => this._eliminadas.set([]),
    });
  }
}