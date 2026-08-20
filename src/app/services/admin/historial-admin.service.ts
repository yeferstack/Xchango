import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccionAdmin } from '../../models/admin/accion-admin';

@Injectable({ providedIn: 'root' })
export class HistorialAdminService {
  private readonly http = inject(HttpClient);

  private readonly _acciones = signal<AccionAdmin[]>([]);
  private readonly _cargando = signal(false);
  private readonly _error = signal<string | null>(null);
  private cargado = false;

  readonly acciones = this._acciones.asReadonly();
  readonly cargando = this._cargando.asReadonly();
  readonly error = this._error.asReadonly();

  cargar(): void {
    if (this.cargado) return;
    this.cargado = true;
    this._cargando.set(true);
    this._error.set(null);

    this.http.get<AccionAdmin[]>('data/historial-acciones.json').subscribe({
      next: datos => {
        this._acciones.set(datos);
        this._cargando.set(false);
      },
      error: () => {
        this.cargado = false;
        this._error.set('No se pudo cargar el historial.');
        this._cargando.set(false);
      },
    });
  }

  /** HU71 — historial de un usuario puntual. */
  porUsuario(usuarioId: string): AccionAdmin[] {
    return this._acciones().filter(a => a.usuarioId === usuarioId);
  }

  /** HU68 — filtro por rango de fechas. */
  entreFechas(desde?: string, hasta?: string): AccionAdmin[] {
    const min = desde ? new Date(desde).getTime() : -Infinity;
    // +1 día para que "hasta" incluya el día completo
    const max = hasta ? new Date(hasta).getTime() + 86_400_000 : Infinity;

    return this._acciones().filter(a => {
      const f = new Date(a.fecha).getTime();
      return f >= min && f <= max;
    });
  }

  recientes(limite = 5): AccionAdmin[] {
    return [...this._acciones()]
      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
      .slice(0, limite);
  }

  /** Registra una acción nueva (suspender, advertir, eliminar...). */
  registrar(accion: Omit<AccionAdmin, 'id' | 'fecha'>): void {
    this._acciones.update(lista => [
      { ...accion, id: crypto.randomUUID(), fecha: new Date().toISOString() },
      ...lista,
    ]);
  }
}
