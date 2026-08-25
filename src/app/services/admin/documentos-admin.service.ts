import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

import { Documento, DocumentoVista } from '../../models/admin/documento';
import { Usuario } from '../../models/usuario.model';
import { AdminUsuario } from '../../models/admin/admin-usuario';

const CLAVE = 'xchango_documentos';

// Verificación de documentos de identidad.
// El usuario sube su documento y aquí el administrador o el moderador lo
// aprueba o lo rechaza. Los datos salen de data/documentos.json.
@Injectable({ providedIn: 'root' })
export class DocumentosAdminService {
  private http = inject(HttpClient);

  private listaDocumentos = signal<Documento[]>([]);
  private listaUsuarios = signal<Usuario[]>([]);
  private listaAdmins = signal<AdminUsuario[]>([]);
  private estaCargando = signal(false);
  private mensajeError = signal<string | null>(null);
  private yaCargo = false;

  cargando = this.estaCargando.asReadonly();
  error = this.mensajeError.asReadonly();

  // Documentos con el nombre del usuario y del revisor ya resueltos.
  documentos = computed<DocumentoVista[]>(() => {
    const usuarios = new Map(this.listaUsuarios().map((u) => [u.id, u]));
    const admins = new Map(this.listaAdmins().map((a) => [a.id, a]));

    return this.listaDocumentos().map((d) => {
      const usuario = usuarios.get(d.usuarioId);
      return {
        ...d,
        usuarioNombre: usuario?.nombre ?? 'Usuario desconocido',
        usuarioEmail: usuario?.email ?? '',
        usuarioAvatar: usuario?.avatar ?? '',
        revisorNombre: d.revisadoPor ? admins.get(d.revisadoPor)?.nombre ?? '' : '',
      };
    });
  });

  pendientes = computed(() => this.documentos().filter((d) => d.estado === 'pendiente'));
  aprobados = computed(() => this.documentos().filter((d) => d.estado === 'aprobado'));
  rechazados = computed(() => this.documentos().filter((d) => d.estado === 'rechazado'));

  cargar(): void {
    if (this.yaCargo) return;
    this.yaCargo = true;
    this.estaCargando.set(true);

    const guardados = this.leerGuardados();

    forkJoin({
      documentos: this.http.get<Documento[]>('data/documentos.json'),
      usuarios: this.http.get<Usuario[]>('data/usuarios.json'),
      admins: this.http.get<AdminUsuario[]>('data/admins.json'),
    }).subscribe({
      next: (datos) => {
        this.listaDocumentos.set(guardados ?? datos.documentos);
        this.listaUsuarios.set(datos.usuarios);
        this.listaAdmins.set(datos.admins);
        this.estaCargando.set(false);
      },
      error: () => {
        this.yaCargo = false;
        this.mensajeError.set('No se pudieron cargar los documentos.');
        this.estaCargando.set(false);
      },
    });
  }

  // Aprueba el documento: la cuenta del usuario queda verificada.
  aprobar(id: string, adminId: string, observacion: string): void {
    this.actualizar(id, 'aprobado', adminId, observacion || 'Documento verificado sin novedad.');
  }

  // Rechaza el documento. La observación explica el motivo.
  rechazar(id: string, adminId: string, observacion: string): void {
    this.actualizar(id, 'rechazado', adminId, observacion || 'El documento no cumple los requisitos.');
  }

  private actualizar(
    id: string,
    estado: Documento['estado'],
    adminId: string,
    observacion: string,
  ): void {
    this.listaDocumentos.update((lista) =>
      lista.map((d) =>
        d.id === id ? { ...d, estado, revisadoPor: adminId, observacion } : d,
      ),
    );
    this.guardar();
  }

  private guardar(): void {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(this.listaDocumentos()));
    } catch {
      // Sin almacenamiento los cambios duran hasta recargar.
    }
  }

  private leerGuardados(): Documento[] | null {
    try {
      const texto = localStorage.getItem(CLAVE);
      return texto ? (JSON.parse(texto) as Documento[]) : null;
    } catch {
      return null;
    }
  }
}
