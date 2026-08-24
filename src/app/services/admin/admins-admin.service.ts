import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AdminUsuario } from '../../models/admin/admin-usuario';

/** Forma cruda del JSON: igual que AdminUsuario pero con password. */
interface AdminConPassword extends AdminUsuario {
  password: string;
}

const CLAVE_SESION = 'xchango_admin';

@Injectable({ providedIn: 'root' })
export class AdminsAdminService {
  private readonly http = inject(HttpClient);

  /** Sesión activa. La leemos de localStorage para sobrevivir a un F5. */
  private readonly _admin = signal<AdminUsuario | null>(this.leerSesion());
  private readonly _cargando = signal(false);

  readonly admin = this._admin.asReadonly();
  readonly cargando = this._cargando.asReadonly();
  readonly autenticado = computed(() => this._admin() !== null);

  /** Solo el administrador puede crear usuarios internos y borrar cuentas. */
  readonly esAdministrador = computed(() => this._admin()?.rol === 'admin');

  /** Lista de usuarios internos (administradores y moderadores). */
  private readonly _lista = signal<AdminUsuario[]>([]);
  readonly lista = this._lista.asReadonly();
  private yaCargo = false;

  /** Trae los usuarios internos desde data/admins.json. */
  cargar(): void {
    if (this.yaCargo) return;
    this.yaCargo = true;

    const guardados = this.leerGuardados();
    if (guardados) {
      this._lista.set(guardados);
      return;
    }

    this.http.get<AdminConPassword[]>('data/admins.json').subscribe({
      next: (datos) => {
        this._lista.set(datos);
        this.guardarLista();
      },
      error: () => {
        this.yaCargo = false;
      },
    });
  }

  /**
   * Crea un moderador o administrador.
   * Devuelve null si se creó bien, o el mensaje de error.
   */
  crearUsuarioInterno(datos: {
    nombre: string;
    email: string;
    password: string;
    rol: 'admin' | 'moderador';
    estado: 'activo' | 'inactivo';
  }): string | null {
    if (!this.esAdministrador()) {
      return 'Solo un administrador puede crear usuarios internos.';
    }

    const correo = datos.email.trim().toLowerCase();
    if (this._lista().some((a) => a.email.toLowerCase() === correo)) {
      return 'Ya existe un usuario interno con ese correo.';
    }

    const nuevo = {
      id: this.siguienteId(),
      nombre: datos.nombre.trim(),
      email: correo,
      password: datos.password,
      rol: datos.rol,
      estado: datos.estado,
      avatar: 'https://i.pravatar.cc/80?u=' + encodeURIComponent(correo),
      ultimoAcceso: new Date().toISOString(),
    } as AdminConPassword;

    this._lista.update((l) => [...l, nuevo]);
    this.guardarLista();
    return null;
  }

  /** Activa o desactiva un usuario interno. Solo el administrador. */
  cambiarEstado(id: string, estado: 'activo' | 'inactivo'): boolean {
    if (!this.esAdministrador()) return false;
    this._lista.update((l) => l.map((a) => (a.id === id ? { ...a, estado } : a)));
    this.guardarLista();
    return true;
  }

  /** Elimina un usuario interno. Solo el administrador, y no a sí mismo. */
  eliminarUsuarioInterno(id: string): string | null {
    if (!this.esAdministrador()) return 'Solo un administrador puede eliminar cuentas.';
    if (id === this.idActual()) return 'No puedes eliminar tu propia cuenta.';

    this._lista.update((l) => l.filter((a) => a.id !== id));
    this.guardarLista();
    return null;
  }

  private siguienteId(): string {
    let mayor = 0;
    for (const a of this._lista()) {
      const n = Number(a.id.replace('a', ''));
      if (!Number.isNaN(n) && n > mayor) mayor = n;
    }
    return 'a' + (mayor + 1);
  }

  private guardarLista(): void {
    try {
      localStorage.setItem('xchango_admins', JSON.stringify(this._lista()));
    } catch {
      // Sin almacenamiento la lista dura hasta recargar.
    }
  }

  private leerGuardados(): AdminUsuario[] | null {
    try {
      const texto = localStorage.getItem('xchango_admins');
      return texto ? (JSON.parse(texto) as AdminUsuario[]) : null;
    } catch {
      return null;
    }
  }

  /**
   * Login contra /data/admins.json.
   * Cuando exista NestJS, esto se vuelve un POST /api/admin/login
   * y el resto de la app no se entera.
   */
  async login(email: string, password: string): Promise<AdminUsuario> {
    this._cargando.set(true);
    try {
      const admins = await firstValueFrom(
        this.http.get<AdminConPassword[]>('data/admins.json')
      );

      const encontrado = admins.find(
        a => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password
      );

      if (!encontrado) throw new Error('Correo o contraseña incorrectos.');
      if (encontrado.estado === 'inactivo') throw new Error('Esta cuenta está inactiva.');

      // Nunca guardamos la contraseña en la sesión
      const { password: _omitida, ...datos } = encontrado;
      const sesion: AdminUsuario = { ...datos, ultimoAcceso: new Date().toISOString() };

      localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
      this._admin.set(sesion);
      return sesion;
    } finally {
      this._cargando.set(false);
    }
  }

  logout(): void {
    localStorage.removeItem(CLAVE_SESION);
    this._admin.set(null);
  }

  /** ID del admin en sesión. Es lo que se guarda en el historial. */
  idActual(): string {
    return this._admin()?.id ?? 'a1';
  }

  /** Nombre del admin en sesión, solo para mostrar en pantalla. */
  nombreActual(): string {
    return this._admin()?.nombre ?? 'Administrador';
  }

  private leerSesion(): AdminUsuario | null {
    try {
      const guardado = localStorage.getItem(CLAVE_SESION);
      return guardado ? (JSON.parse(guardado) as AdminUsuario) : null;
    } catch {
      return null;
    }
  }
}
