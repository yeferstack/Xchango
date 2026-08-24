import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IconoComponent } from '../../../components/icono/icono';
import { DocumentosAdminService } from '../../../services/admin/documentos-admin.service';
import { AdminsAdminService } from '../../../services/admin/admins-admin.service';
import { DocumentoVista } from '../../../models/admin/documento';

type Filtro = 'pendiente' | 'aprobado' | 'rechazado' | 'todos';

/**
 * Verificación de documentos.
 * El usuario sube su documento y aquí se aprueba o se rechaza.
 */
@Component({
  selector: 'app-documentos',
  standalone: true,
  imports: [CommonModule, FormsModule, IconoComponent],
  templateUrl: './documentos.html',
  styleUrl: './documentos.css',
})
export class DocumentosComponent implements OnInit {
  private srv = inject(DocumentosAdminService);
  private admins = inject(AdminsAdminService);

  filtro = signal<Filtro>('pendiente');

  /** Observación que escribe el revisor, guardada por id de documento. */
  observaciones: Record<string, string> = {};

  cargando = this.srv.cargando;
  pendientes = this.srv.pendientes;

  listado = computed<DocumentoVista[]>(() => {
    const f = this.filtro();
    if (f === 'todos') return this.srv.documentos();
    return this.srv.documentos().filter((d) => d.estado === f);
  });

  ngOnInit(): void {
    this.srv.cargar();
    this.admins.cargar();
  }

  cambiarFiltro(f: Filtro): void {
    this.filtro.set(f);
  }

  contar(estado: Filtro): number {
    if (estado === 'todos') return this.srv.documentos().length;
    return this.srv.documentos().filter((d) => d.estado === estado).length;
  }

  aprobar(d: DocumentoVista): void {
    this.srv.aprobar(d.id, this.admins.idActual(), this.observaciones[d.id] || '');
    this.observaciones[d.id] = '';
  }

  rechazar(d: DocumentoVista): void {
    this.srv.rechazar(d.id, this.admins.idActual(), this.observaciones[d.id] || '');
    this.observaciones[d.id] = '';
  }

  claseEstado(estado: string): string {
    if (estado === 'aprobado') return 'doc__chip doc__chip--ok';
    if (estado === 'rechazado') return 'doc__chip doc__chip--no';
    return 'doc__chip doc__chip--pend';
  }
}
