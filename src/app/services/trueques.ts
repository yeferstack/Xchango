import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

import { Usuario } from '../models/usuario.model';
import { Categoria } from '../models/categoria.model';
import {
  CLASE_BADGE_TIPO,
  ETIQUETA_TIPO,
  Publicacion,
  PublicacionVista,
  TipoPublicacion,
} from '../models/publicacion.model';
import { Trueque, TruequeVista } from '../models/trueque.model';
import { Notificacion, TipoNotificacion } from '../models/notificacion.model';
import { AvisoUbicacion } from '../models/aviso-ubicacion.model';

const CLAVE_DATOS = 'xchango_datos';
const CLAVE_SESION = 'xchango_sesion';
// Si se cambian los JSON, subir este número para que se vuelvan a leer.
const VERSION = 9;

const IMAGEN_RESPALDO = 'https://placehold.co/600x450/ece2c9/1f1b16?text=Sin+imagen';

interface DatosGuardados {
  version: number;
  usuarios: Usuario[];
  categorias: Categoria[];
  publicaciones: Publicacion[];
  trueques: Trueque[];
  notificaciones: Notificacion[];
  favoritos: string[];
}

export interface CategoriaSidebar {
  id: string;
  nombre: string;
  icono: string;
}

// Lo que mandan los formularios de crear y editar publicación.
export interface DatosPublicacion {
  tipo: TipoPublicacion;
  categoriaId: string;
  titulo: string;
  descripcion: string;
  ofreces: string;
  buscas: string;
  municipio?: string;
  barrio?: string;
  cantidadDisponible?: string;
  disponibilidad?: string;
  imagenes?: string[];
}

// Servicio principal de XchanGo.
// La primera vez lee los archivos de src/app/data y de ahí en adelante trabaja
// con localStorage, así los cambios no se pierden al recargar la página.
// Mientras no exista la API, esto hace las veces del servidor.
// Los JSON guardan solo los ids (usuarioId, categoriaId). Aquí se unen para
// mostrar el nombre del autor, la categoría, la ciudad, etc.
@Injectable({ providedIn: 'root' })
export class TruequesService {
  private http = inject(HttpClient);

  private listaUsuarios = signal<Usuario[]>([]);
  private listaCategorias = signal<Categoria[]>([]);
  private listaPublicaciones = signal<Publicacion[]>([]);
  private listaTrueques = signal<Trueque[]>([]);
  private listaNotificaciones = signal<Notificacion[]>([]);
  private listaAvisos = signal<AvisoUbicacion[]>([]);
  private favoritos = signal<Set<string>>(new Set<string>());
  private estaCargando = signal(false);
  private mensajeError = signal<string | null>(null);
  private datosListos = signal(false);
  private pidiendo = false;

  cargando = this.estaCargando.asReadonly();
  error = this.mensajeError.asReadonly();
  listo = this.datosListos.asReadonly();
  usuarios = this.listaUsuarios.asReadonly();
  categorias = this.listaCategorias.asReadonly();

  // Id del usuario que inició sesión. null = nadie.
  usuarioActualId = signal<string | null>(this.leerSesion());

  usuarioActual = computed<Usuario | null>(
    () => this.listaUsuarios().find((u) => u.id === this.usuarioActualId()) ?? null,
  );

  autenticado = computed(() => this.usuarioActual() !== null);

  categoriasSidebar = computed<CategoriaSidebar[]>(() => [
    { id: 'todos', nombre: 'Todos', icono: 'grid' },
    ...this.listaCategorias().map((c) => ({ id: c.id, nombre: c.nombre, icono: c.icono })),
  ]);

  // Cargar y guardar

  // Se llama desde el ngOnInit de cada página. Solo carga una vez.
  cargar(): void {
    if (this.datosListos() || this.pidiendo) return;

    const guardados = this.leerGuardado();
    if (guardados) {
      this.aplicar(guardados);
      this.datosListos.set(true);
      return;
    }

    this.pidiendo = true;
    this.estaCargando.set(true);
    this.mensajeError.set(null);

    forkJoin({
      usuarios: this.http.get<Usuario[]>('data/usuarios.json'),
      categorias: this.http.get<Categoria[]>('data/categorias.json'),
      publicaciones: this.http.get<Publicacion[]>('data/publicaciones.json'),
      trueques: this.http.get<Trueque[]>('data/trueques.json'),
      notificaciones: this.http.get<Notificacion[]>('data/notificaciones.json'),
      avisos: this.http.get<AvisoUbicacion[]>('data/avisos-ubicacion.json'),
    }).subscribe({
      next: (datos) => {
        this.listaUsuarios.set(datos.usuarios);
        this.listaCategorias.set(datos.categorias);
        this.listaPublicaciones.set(datos.publicaciones);
        this.listaTrueques.set(datos.trueques);
        this.listaNotificaciones.set(datos.notificaciones);
        this.listaAvisos.set(datos.avisos);
        this.guardar();
        this.estaCargando.set(false);
        this.pidiendo = false;
        this.datosListos.set(true);
      },
      error: (e) => {
        this.pidiendo = false;
        this.mensajeError.set(
          'No se pudieron cargar los datos. Revisa que src/app/data esté ' +
            'publicada como asset en angular.json (debe servirse en /data).',
        );
        this.estaCargando.set(false);
        console.error('[XchanGo] Error cargando data/*.json:', e);
      },
    });
  }

  // Borra lo guardado y vuelve a los JSON originales.
  reiniciarDatos(): void {
    try {
      localStorage.removeItem(CLAVE_DATOS);
      localStorage.removeItem(CLAVE_SESION);
    } catch {
      // El navegador puede tener bloqueado el almacenamiento.
    }
    this.datosListos.set(false);
    this.usuarioActualId.set(null);
    this.cargar();
  }

  private aplicar(d: DatosGuardados): void {
    this.listaUsuarios.set(d.usuarios);
    this.listaCategorias.set(d.categorias);
    this.listaPublicaciones.set(d.publicaciones);
    this.listaTrueques.set(d.trueques);
    this.listaNotificaciones.set(d.notificaciones);
    this.favoritos.set(new Set(d.favoritos || []));
  }

  private leerGuardado(): DatosGuardados | null {
    try {
      const texto = localStorage.getItem(CLAVE_DATOS);
      if (!texto) return null;
      const datos = JSON.parse(texto) as DatosGuardados;
      if (datos.version !== VERSION) return null;
      return datos;
    } catch {
      return null;
    }
  }

  private guardar(): void {
    try {
      const datos: DatosGuardados = {
        version: VERSION,
        usuarios: this.listaUsuarios(),
        categorias: this.listaCategorias(),
        publicaciones: this.listaPublicaciones(),
        trueques: this.listaTrueques(),
        notificaciones: this.listaNotificaciones(),
        favoritos: Array.from(this.favoritos()),
      };
      localStorage.setItem(CLAVE_DATOS, JSON.stringify(datos));
    } catch {
      // Si no se puede guardar, la aplicación igual sigue funcionando.
    }
  }

  private leerSesion(): string | null {
    try {
      return localStorage.getItem(CLAVE_SESION);
    } catch {
      return null;
    }
  }

  private guardarSesion(id: string | null): void {
    try {
      if (id) {
        localStorage.setItem(CLAVE_SESION, id);
      } else {
        localStorage.removeItem(CLAVE_SESION);
      }
    } catch {
      // Sin almacenamiento la sesión dura hasta recargar.
    }
  }

  // Sesión

  // Devuelve null si entró bien, o el mensaje de error.
  // Simulación de práctica: aquí no se usan contraseñas, solo el correo +
  // el código de verificación (pantalla previa a esta llamada). Si el
  // correo no existe todavía, se crea la cuenta al vuelo.
  iniciarSesion(email: string): string | null {
    const correo = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      return 'Ingresa un correo válido.';
    }

    let usuario = this.listaUsuarios().find((u) => u.email.toLowerCase() === correo);

    if (usuario) {
      if (usuario.estado === 'suspendido') return 'Tu cuenta está suspendida.';
    } else {
      usuario = {
        id: this.siguienteId('u', this.listaUsuarios()),
        nombre: correo.split('@')[0],
        email: correo,
        telefono: '',
        password: '',
        estado: 'activo',
        verificacion: 'verificado',
        descripcion: '',
        fechaRegistro: this.hoy(),
        ubicacion: 'Yopal',
        nivelActividad: 'bajo',
        avatar: this.avatarAleatorio(),
        publicaciones: 0,
        intercambios: 0,
        reportes: 0,
        calificacion: 0,
        totalCalificaciones: 0,
      };
      this.listaUsuarios.update((lista) => [...lista, usuario as Usuario]);
      this.guardar();
    }

    this.usuarioActualId.set(usuario.id);
    this.guardarSesion(usuario.id);
    return null;
  }

  // Foto de perfil para una cuenta nueva. Se elige de una lista curada de
  // fotos de pravatar.cc (las mismas que ya usan los usuarios de prueba),
  // en vez de generar una al azar por hash de correo, que a veces salía
  // una imagen rara o poco presentable.
  private avatarAleatorio(): string {
    const fotos = [12, 5, 15, 33, 44, 45, 47, 48, 60, 65, 68, 47, 32, 20, 25];
    const numero = fotos[Math.floor(Math.random() * fotos.length)];
    return `https://i.pravatar.cc/80?img=${numero}`;
  }

  cerrarSesion(): void {
    this.usuarioActualId.set(null);
    this.guardarSesion(null);
  }

  // Devuelve null si registró bien, o el mensaje de error.
  // true si ya existe una cuenta con ese correo (para el paso 1 del registro).
  correoRegistrado(email: string): boolean {
    const correo = email.trim().toLowerCase();
    return this.listaUsuarios().some((u) => u.email.toLowerCase() === correo);
  }

  registrar(datos: {
    nombre: string;
    email: string;
    telefono: string;
    ubicacion: string;
  }): string | null {
    const correo = datos.email.trim().toLowerCase();

    if (!datos.nombre.trim()) return 'El nombre es obligatorio.';
    if (this.listaUsuarios().some((u) => u.email.toLowerCase() === correo)) {
      return 'Ese correo ya está registrado.';
    }

    const nuevo: Usuario = {
      id: this.siguienteId('u', this.listaUsuarios()),
      nombre: datos.nombre.trim(),
      email: correo,
      telefono: datos.telefono.replace(/\D/g, ''),
      password: '',
      estado: 'activo',
      verificacion: 'no_verificado',
      descripcion: '',
      fechaRegistro: this.hoy(),
      ubicacion: datos.ubicacion || 'Yopal',
      nivelActividad: 'bajo',
      avatar: this.avatarAleatorio(),
      publicaciones: 0,
      intercambios: 0,
      reportes: 0,
      calificacion: 0,
      totalCalificaciones: 0,
    };

    this.listaUsuarios.update((lista) => [...lista, nuevo]);
    this.usuarioActualId.set(nuevo.id);
    this.guardarSesion(nuevo.id);
    this.guardar();
    return null;
  }

  // Actualiza los datos del perfil del usuario que tiene la sesión.
  actualizarPerfil(cambios: {
    nombre?: string;
    telefono?: string;
    ubicacion?: string;
    descripcion?: string;
    avatar?: string;
  }): boolean {
    const id = this.usuarioActualId();
    if (!id) return false;

    this.listaUsuarios.update((lista) =>
      lista.map((u) => (u.id === id ? { ...u, ...cambios } : u)),
    );
    this.guardar();
    return true;
  }

  // Devuelve null si cambió bien, o el mensaje de error.
  cambiarPassword(actual: string, nueva: string): string | null {
    const usuario = this.usuarioActual();
    if (!usuario) return 'No hay sesión activa.';
    if (usuario.password !== actual) return 'La contraseña actual no coincide.';
    if (nueva.length < 8) return 'La nueva contraseña debe tener al menos 8 caracteres.';

    this.listaUsuarios.update((lista) =>
      lista.map((u) => (u.id === usuario.id ? { ...u, password: nueva } : u)),
    );
    this.guardar();
    return null;
  }

  verificarCuenta(): void {
    const id = this.usuarioActualId();
    if (!id) return;
    this.listaUsuarios.update((lista) =>
      lista.map((u) => (u.id === id ? { ...u, verificacion: 'verificado' as const } : u)),
    );
    this.guardar();
  }

  // Publicaciones

  todas = computed<PublicacionVista[]>(() => {
    const usuarios = new Map(this.listaUsuarios().map((u) => [u.id, u]));
    const categorias = new Map(this.listaCategorias().map((c) => [c.id, c]));
    const marcados = this.favoritos();

    // Cuántas solicitudes tiene cada publicación.
    const propuestas = new Map<string, number>();
    for (const t of this.listaTrueques()) {
      propuestas.set(t.publicacionId, (propuestas.get(t.publicacionId) ?? 0) + 1);
    }

    return this.listaPublicaciones().map((p) => {
      const autor = usuarios.get(p.usuarioId);
      const nombreCategoria = categorias.get(p.categoriaId)?.nombre ?? 'Sin categoría';
      const esDigital = p.tipo === 'bien_digital';

      return {
        ...p,
        autor: autor?.nombre ?? 'Usuario desconocido',
        avatar: autor?.avatar ?? '',
        telefono: autor?.telefono ?? '',
        // Un bien digital no tiene ubicación porque se entrega de una vez.
        ciudad: esDigital ? 'Entrega digital' : p.municipio,
        categoria: nombreCategoria,
        imagen: p.imagenes[0] ?? IMAGEN_RESPALDO,
        favorito: marcados.has(p.id),
        tipoEtiqueta: ETIQUETA_TIPO[p.tipo],
        claseBadge: CLASE_BADGE_TIPO[p.tipo],
        caracteristicas: this.fichaTecnica(p, nombreCategoria),
        interesesCambio: this.separarIntereses(p.buscas),
        publicadoHace: this.textoRelativo(p.fechaCreacion),
        propuestas: propuestas.get(p.id) ?? 0,
      } as PublicacionVista;
    });
  });

  publicaciones = computed<PublicacionVista[]>(() =>
    this.todas().filter((p) => p.estado !== 'eliminada'),
  );

  misPublicaciones = computed<PublicacionVista[]>(() => {
    const id = this.usuarioActualId();
    if (!id) return [];
    return this.todas().filter((p) => p.usuarioId === id && p.estado !== 'eliminada');
  });

  publicacionesFavoritas = computed<PublicacionVista[]>(() =>
    this.publicaciones().filter((p) => p.favorito),
  );

  obtenerPorId(id: string): PublicacionVista | undefined {
    return this.todas().find((p) => p.id === id);
  }

  // Crea la publicación y devuelve su id, o null si no hay sesión.
  crearPublicacion(datos: DatosPublicacion): string | null {
    const usuario = this.usuarioActual();
    if (!usuario) return null;

    const id = this.siguienteId('pub', this.listaPublicaciones());
    const nueva = this.armarPublicacion(
      {
        id: id,
        usuarioId: usuario.id,
        categoriaId: datos.categoriaId,
        titulo: datos.titulo.trim(),
        descripcion: datos.descripcion.trim(),
        ofreces: datos.ofreces.trim() || datos.titulo.trim(),
        buscas: datos.buscas.trim(),
        imagenes: datos.imagenes && datos.imagenes.length ? datos.imagenes : [],
        estado: 'activa',
        vistas: 0,
        fechaCreacion: this.hoy(),
        fechaModificacion: this.hoy(),
      },
      datos,
    );

    this.listaPublicaciones.update((lista) => [nueva, ...lista]);
    this.contarPublicaciones(usuario.id);
    this.guardar();
    return id;
  }

  actualizarPublicacion(id: string, datos: DatosPublicacion): boolean {
    const actual = this.listaPublicaciones().find((p) => p.id === id);
    if (!actual) return false;
    if (actual.usuarioId !== this.usuarioActualId()) return false;

    const nuevasImagenes =
      datos.imagenes && datos.imagenes.length ? datos.imagenes : actual.imagenes;

    const editada = this.armarPublicacion(
      {
        id: actual.id,
        usuarioId: actual.usuarioId,
        categoriaId: datos.categoriaId,
        titulo: datos.titulo.trim(),
        descripcion: datos.descripcion.trim(),
        ofreces: datos.ofreces.trim() || datos.titulo.trim(),
        buscas: datos.buscas.trim(),
        imagenes: nuevasImagenes,
        estado: actual.estado,
        vistas: actual.vistas,
        fechaCreacion: actual.fechaCreacion,
        fechaModificacion: this.hoy(),
      },
      datos,
    );

    this.listaPublicaciones.update((lista) => lista.map((p) => (p.id === id ? editada : p)));
    this.guardar();
    return true;
  }

  // No borra el registro: le cambia el estado a eliminada.
  eliminarPublicacion(id: string): boolean {
    const p = this.listaPublicaciones().find((x) => x.id === id);
    if (!p || p.usuarioId !== this.usuarioActualId()) return false;

    this.listaPublicaciones.update((lista) =>
      lista.map((x) => (x.id === id ? { ...x, estado: 'eliminada' as const } : x)),
    );
    this.contarPublicaciones(p.usuarioId);
    this.guardar();
    return true;
  }

  // Pausa una publicación activa, o reactiva una pausada.
  alternarEstadoPublicacion(id: string): void {
    this.listaPublicaciones.update((lista) =>
      lista.map((p) => {
        if (p.id !== id || p.usuarioId !== this.usuarioActualId()) return p;
        if (p.estado === 'activa') return { ...p, estado: 'pausada' as const };
        if (p.estado === 'pausada') return { ...p, estado: 'activa' as const };
        return p;
      }),
    );
    this.guardar();
  }

  // Arma la publicación según el tipo. Aquí está la regla principal:
  // el bien físico lleva municipio y barrio, el servicio solo municipio,
  // y el bien digital no lleva ubicación ni cantidad ni disponibilidad.
  private armarPublicacion(
    base: Record<string, unknown>,
    datos: DatosPublicacion,
  ): Publicacion {
    if (datos.tipo === 'bien_fisico') {
      return {
        ...base,
        tipo: 'bien_fisico',
        municipio: datos.municipio || '',
        barrio: datos.barrio || '',
        cantidadDisponible: datos.cantidadDisponible || '1 unidad',
        disponibilidad: datos.disponibilidad || 'Por acordar',
      } as unknown as Publicacion;
    }

    if (datos.tipo === 'servicio') {
      return {
        ...base,
        tipo: 'servicio',
        municipio: datos.municipio || '',
        cantidadDisponible: datos.cantidadDisponible || '1 sesión',
        disponibilidad: datos.disponibilidad || 'Por acordar',
      } as unknown as Publicacion;
    }

    return { ...base, tipo: 'bien_digital' } as unknown as Publicacion;
  }

  // Vuelve a contar cuántas publicaciones tiene el usuario.
  private contarPublicaciones(usuarioId: string): void {
    const total = this.listaPublicaciones().filter(
      (p) => p.usuarioId === usuarioId && p.estado !== 'eliminada',
    ).length;

    this.listaUsuarios.update((lista) =>
      lista.map((u) => (u.id === usuarioId ? { ...u, publicaciones: total } : u)),
    );
  }

  etiquetaTipo(tipo: TipoPublicacion): string {
    return ETIQUETA_TIPO[tipo];
  }

  // Usa solo clases que ya existen en el CSS del proyecto.
  claseBadge(tipo: TipoPublicacion): string {
    return CLASE_BADGE_TIPO[tipo] ?? 'badge';
  }

  calificacionDe(usuarioId: string): number {
    return this.listaUsuarios().find((u) => u.id === usuarioId)?.calificacion ?? 0;
  }

  private fichaTecnica(p: Publicacion, categoria: string): { label: string; valor: string }[] {
    const filas = [
      { label: 'Tipo', valor: ETIQUETA_TIPO[p.tipo] },
      { label: 'Categoría', valor: categoria },
      { label: 'Ofrece', valor: p.ofreces },
      { label: 'Busca', valor: p.buscas },
    ];

    if (p.tipo === 'bien_fisico') {
      filas.push({ label: 'Municipio', valor: p.municipio });
      filas.push({ label: 'Barrio', valor: p.barrio });
      filas.push({ label: 'Cantidad disponible', valor: p.cantidadDisponible });
      filas.push({ label: 'Disponibilidad', valor: p.disponibilidad });
    } else if (p.tipo === 'servicio') {
      filas.push({ label: 'Municipio', valor: p.municipio });
      filas.push({ label: 'Cantidad disponible', valor: p.cantidadDisponible });
      filas.push({ label: 'Disponibilidad', valor: p.disponibilidad });
    } else {
      filas.push({ label: 'Entrega', valor: 'Inmediata / digital' });
    }

    return filas;
  }

  // Parte el texto de "buscas" para mostrarlo como etiquetas.
  // OJO con la ñ: en una expresión regular \b la trata como si NO fuera letra,
  // así que /\bo\b/ partía "Diseño" en "Diseñ" + "o". Por eso aquí se separa
  // solo por coma o por " o " con espacios reales a los lados.
  private separarIntereses(buscas: string): string[] {
    const partes = buscas
      .split(/\s*,\s*|\s+o\s+/i)
      .map((x) => x.trim())
      .filter((x) => x.length > 0);
    return partes.length ? partes : ['Abierto a propuestas'];
  }

  private textoRelativo(fecha: string): string {
    const dias = Math.floor((Date.now() - new Date(fecha).getTime()) / 86400000);
    if (dias <= 0) return 'Publicado hoy';
    if (dias === 1) return 'Publicado ayer';
    return 'Publicado hace ' + dias + ' días';
  }

  // Trueques

  trueques = computed<TruequeVista[]>(() => {
    const usuarios = new Map(this.listaUsuarios().map((u) => [u.id, u]));
    const publicaciones = new Map(this.listaPublicaciones().map((p) => [p.id, p]));

    return this.listaTrueques().map((t) => {
      const solicitante = usuarios.get(t.solicitanteId);
      const propietario = usuarios.get(t.propietarioId);

      return {
        ...t,
        solicitanteNombre: solicitante?.nombre ?? 'Usuario desconocido',
        solicitanteAvatar: solicitante?.avatar ?? '',
        solicitanteTelefono: solicitante?.telefono ?? '',
        propietarioNombre: propietario?.nombre ?? 'Usuario desconocido',
        propietarioTelefono: propietario?.telefono ?? '',
        publicacionTitulo:
          publicaciones.get(t.publicacionId)?.titulo ?? 'Publicación no disponible',
      };
    });
  });

  truequesRecibidos = computed<TruequeVista[]>(() =>
    this.trueques().filter((t) => t.propietarioId === this.usuarioActualId()),
  );

  truequesEnviados = computed<TruequeVista[]>(() =>
    this.trueques().filter((t) => t.solicitanteId === this.usuarioActualId()),
  );

  solicitudesPendientes = computed(
    () => this.truequesRecibidos().filter((t) => t.estado === 'pendiente').length,
  );

  // Devuelve null si la solicitud se envió, o el mensaje de error.
  solicitarTrueque(publicacionId: string, ofrece: string): string | null {
    const yo = this.usuarioActual();
    if (!yo) return 'Inicia sesión para proponer un trueque.';

    const pub = this.listaPublicaciones().find((p) => p.id === publicacionId);
    if (!pub) return 'La publicación ya no existe.';
    if (pub.usuarioId === yo.id) return 'Esta publicación es tuya.';
    if (pub.estado !== 'activa') return 'Esta publicación no está disponible.';

    const yaLaPedi = this.listaTrueques().some(
      (t) =>
        t.publicacionId === publicacionId &&
        t.solicitanteId === yo.id &&
        (t.estado === 'pendiente' || t.estado === 'aceptado'),
    );
    if (yaLaPedi) return 'Ya tienes una propuesta abierta para esta publicación.';

    const nuevo: Trueque = {
      id: this.siguienteId('tr', this.listaTrueques()),
      solicitanteId: yo.id,
      propietarioId: pub.usuarioId,
      publicacionId: publicacionId,
      ofrece: ofrece.trim() || 'Propuesta por acordar',
      busca: pub.titulo,
      estado: 'pendiente',
      fechaSolicitud: this.hoy(),
      fechaCierre: null,
      confirmadoSolicitante: false,
      confirmadoPropietario: false,
      calificacionSolicitante: null,
      calificacionPropietario: null,
    };

    this.listaTrueques.update((lista) => [nuevo, ...lista]);
    this.crearNotificacion(
      pub.usuarioId,
      'solicitud',
      'Nueva solicitud de trueque',
      yo.nombre + ' quiere truequear por tu publicación "' + pub.titulo + '".',
      nuevo.id,
    );
    this.guardar();
    return null;
  }

  aceptarTrueque(truequeId: string): void {
    const t = this.listaTrueques().find((x) => x.id === truequeId);
    if (!t || t.propietarioId !== this.usuarioActualId()) return;

    this.cambiarEstadoTrueque(truequeId, 'aceptado', null);
    this.crearNotificacion(
      t.solicitanteId,
      'aceptada',
      'Tu solicitud fue aceptada',
      'Aceptaron tu propuesta. Continúa la negociación por WhatsApp.',
      truequeId,
    );
    this.guardar();
  }

  rechazarTrueque(truequeId: string): void {
    const t = this.listaTrueques().find((x) => x.id === truequeId);
    if (!t || t.propietarioId !== this.usuarioActualId()) return;

    this.cambiarEstadoTrueque(truequeId, 'rechazado', this.hoy());
    this.crearNotificacion(
      t.solicitanteId,
      'rechazada',
      'Tu solicitud fue rechazada',
      'Tu propuesta por "' + this.tituloDe(t.publicacionId) + '" fue rechazada.',
      truequeId,
    );
    this.guardar();
  }

  // Cada parte confirma. Cuando confirman las dos, queda completado.
  confirmarTrueque(truequeId: string): void {
    const yo = this.usuarioActualId();
    if (!yo) return;

    this.listaTrueques.update((lista) =>
      lista.map((t) => {
        if (t.id !== truequeId) return t;
        if (t.estado !== 'aceptado') return t;

        const soySolicitante = t.solicitanteId === yo;
        const soyPropietario = t.propietarioId === yo;
        if (!soySolicitante && !soyPropietario) return t;

        const actualizado: Trueque = {
          ...t,
          confirmadoSolicitante: soySolicitante ? true : t.confirmadoSolicitante,
          confirmadoPropietario: soyPropietario ? true : t.confirmadoPropietario,
        };

        if (actualizado.confirmadoSolicitante && actualizado.confirmadoPropietario) {
          actualizado.estado = 'completado';
          actualizado.fechaCierre = this.hoy();
        }
        return actualizado;
      }),
    );

    const t = this.listaTrueques().find((x) => x.id === truequeId);
    if (t && t.estado === 'completado') {
      // La publicación queda finalizada, menos los digitales que son ilimitados.
      this.listaPublicaciones.update((lista) =>
        lista.map((p) =>
          p.id === t.publicacionId && p.tipo !== 'bien_digital'
            ? { ...p, estado: 'finalizada' as const }
            : p,
        ),
      );


      this.contarIntercambios(t.solicitanteId);
      this.contarIntercambios(t.propietarioId);
    }
    this.guardar();
  }

  // Nota de 1 a 5 que pone el usuario que tiene la sesión.
  calificarTrueque(truequeId: string, nota: number): void {
    const yo = this.usuarioActualId();
    if (!yo || nota < 1 || nota > 5) return;

    this.listaTrueques.update((lista) =>
      lista.map((t) => {
        if (t.id !== truequeId || t.estado !== 'completado') return t;
        if (t.solicitanteId === yo) return { ...t, calificacionSolicitante: nota };
        if (t.propietarioId === yo) return { ...t, calificacionPropietario: nota };
        return t;
      }),
    );
    this.calcularCalificaciones();
    this.guardar();
  }

  // Nota que ya puso el usuario en ese trueque (0 si todavía no califica).
  miCalificacion(t: TruequeVista): number {
    const yo = this.usuarioActualId();
    if (t.solicitanteId === yo) return t.calificacionSolicitante ?? 0;
    if (t.propietarioId === yo) return t.calificacionPropietario ?? 0;
    return 0;
  }

  private cambiarEstadoTrueque(
    id: string,
    estado: Trueque['estado'],
    cierre: string | null,
  ): void {
    this.listaTrueques.update((lista) =>
      lista.map((t) =>
        t.id === id ? { ...t, estado: estado, fechaCierre: cierre ?? t.fechaCierre } : t,
      ),
    );
  }

  private tituloDe(publicacionId: string): string {
    const p = this.listaPublicaciones().find((x) => x.id === publicacionId);
    return p ? p.titulo : 'la publicación';
  }

  private contarIntercambios(usuarioId: string): void {
    const total = this.listaTrueques().filter(
      (t) =>
        t.estado === 'completado' &&
        (t.solicitanteId === usuarioId || t.propietarioId === usuarioId),
    ).length;

    this.listaUsuarios.update((lista) =>
      lista.map((u) => (u.id === usuarioId ? { ...u, intercambios: total } : u)),
    );
  }

  // Saca el promedio de las notas que recibió cada usuario.
  private calcularCalificaciones(): void {
    const notasPorUsuario = new Map<string, number[]>();

    const agregar = (id: string, nota: number) => {
      const notas = notasPorUsuario.get(id) ?? [];
      notas.push(nota);
      notasPorUsuario.set(id, notas);
    };

    for (const t of this.listaTrueques()) {
      // La nota que pone el solicitante la recibe el propietario, y al revés.
      if (t.calificacionSolicitante !== null) agregar(t.propietarioId, t.calificacionSolicitante);
      if (t.calificacionPropietario !== null) agregar(t.solicitanteId, t.calificacionPropietario);
    }

    this.listaUsuarios.update((lista) =>
      lista.map((u) => {
        const notas = notasPorUsuario.get(u.id) ?? [];
        if (notas.length === 0) {
          return { ...u, calificacion: 0, totalCalificaciones: 0 };
        }
        const suma = notas.reduce((a, b) => a + b, 0);
        return {
          ...u,
          calificacion: Math.round((suma / notas.length) * 10) / 10,
          totalCalificaciones: notas.length,
        };
      }),
    );
  }

  // Notificaciones (avisos de una sola vía, no es un chat)

  notificaciones = computed<Notificacion[]>(() => {
    const id = this.usuarioActualId();
    if (!id) return [];
    return this.listaNotificaciones()
      .filter((n) => n.usuarioId === id)
      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
  });

  notificacionesSinLeer = computed(
    () => this.notificaciones().filter((n) => !n.leida).length,
  );

  // Aviso del municipio elegido. Sale de data/avisos-ubicacion.json y es
  // solo para mostrar: no se guarda ni se marca como leído.
  avisoDeUbicacion(municipio: string): AvisoUbicacion | undefined {
    const lista = this.listaAvisos();
    return lista.find((a) => a.municipio === municipio) ?? lista.find((a) => a.municipio === '');
  }

  marcarNotificacionLeida(id: string): void {
    this.listaNotificaciones.update((lista) =>
      lista.map((n) => (n.id === id ? { ...n, leida: true } : n)),
    );
    this.guardar();
  }

  marcarTodasLeidas(): void {
    const yo = this.usuarioActualId();
    this.listaNotificaciones.update((lista) =>
      lista.map((n) => (n.usuarioId === yo ? { ...n, leida: true } : n)),
    );
    this.guardar();
  }

  private crearNotificacion(
    usuarioId: string,
    tipo: TipoNotificacion,
    titulo: string,
    mensaje: string,
    referenciaId: string | null,
  ): void {
    this.listaNotificaciones.update((lista) => [
      {
        id: this.siguienteId('not', lista),
        usuarioId: usuarioId,
        tipo: tipo,
        titulo: titulo,
        mensaje: mensaje,
        referenciaId: referenciaId,
        leida: false,
        fecha: new Date().toISOString(),
      },
      ...lista,
    ]);
  }

  // WhatsApp: XchanGo no tiene chat interno

  enlaceWhatsApp(publicacion: PublicacionVista): string | null {
    if (!publicacion.telefono) return null;
    if (publicacion.usuarioId === this.usuarioActualId()) return null;

    const yo = this.usuarioActual()?.nombre ?? 'un usuario de XchanGo';
    const texto =
      'Hola ' + publicacion.autor + ', soy ' + yo + '. ' +
      'Vi tu publicación "' + publicacion.titulo + '" en XchanGo y quiero proponerte un trueque. ' +
      'Tú buscas: ' + publicacion.buscas + '. ¿Lo hablamos?';

    return this.armarEnlace(publicacion.telefono, texto);
  }

  enlaceWhatsAppTrueque(t: TruequeVista): string | null {
    const yo = this.usuarioActualId();
    const soyPropietario = t.propietarioId === yo;
    const telefono = soyPropietario ? t.solicitanteTelefono : t.propietarioTelefono;
    const destino = soyPropietario ? t.solicitanteNombre : t.propietarioNombre;
    if (!telefono) return null;

    const texto =
      'Hola ' + destino + ', te escribo desde XchanGo por el trueque de "' +
      t.publicacionTitulo + '". Ofrezco: ' + t.ofrece + '.';

    return this.armarEnlace(telefono, texto);
  }

  abrirWhatsApp(enlace: string | null): void {
    if (enlace) {
      window.open(enlace, '_blank');
    }
  }

  // Le pone el indicativo de Colombia al número.
  private armarEnlace(telefono: string, texto: string): string {
    const numeros = telefono.replace(/\D/g, '');
    const conIndicativo = numeros.startsWith('57') ? numeros : '57' + numeros;
    return 'https://wa.me/' + conIndicativo + '?text=' + encodeURIComponent(texto);
  }

  // Favoritos

  alternarFavorito(publicacion: { id: string }): void {
    const copia = new Set(this.favoritos());
    if (copia.has(publicacion.id)) {
      copia.delete(publicacion.id);
    } else {
      copia.add(publicacion.id);
    }
    this.favoritos.set(copia);
    this.guardar();
  }

  esFavorito(id: string): boolean {
    return this.favoritos().has(id);
  }

  // Ayudas

  // Busca el número más alto y devuelve el siguiente: pub13 -> pub14
  private siguienteId(prefijo: string, lista: { id: string }[]): string {
    let mayor = 0;
    for (const item of lista) {
      const numero = Number(item.id.replace(prefijo, ''));
      if (!Number.isNaN(numero) && numero > mayor) {
        mayor = numero;
      }
    }
    return prefijo + (mayor + 1);
  }

  private hoy(): string {
    return new Date().toISOString().slice(0, 10);
  }
}
