import { CommonModule } from '@angular/common';
import { MUNICIPIOS_CASANARE } from '../../shared/municipios-casanare';
import { AvisoUbicacion } from '../../models/aviso-ubicacion.model';
import { ModalDetalleTruequeComponent } from '../../layout/modal-detalle-trueque/modal-detalle-trueque';
import { Component, OnInit, HostListener, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../layout/header/header';
import { Categoria } from '../../models/categoria.model';
import { PublicacionVista, TipoPublicacion } from '../../models/publicacion.model';
import { TruequesService } from '../../services/trueques';

type FiltroTrueque = 'todos' | 'bienes' | 'servicios' | 'digitales';

// Cada pestaña del home corresponde a un tipo real de publicación.
const TIPO_POR_FILTRO: Record<Exclude<FiltroTrueque, 'todos'>, TipoPublicacion> = {
  bienes: 'bien_fisico',
  servicios: 'servicio',
  digitales: 'bien_digital',
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ModalDetalleTruequeComponent, CommonModule, FormsModule, HeaderComponent, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit {
  busqueda = '';
  filtroActivo: FiltroTrueque = 'bienes';
  categoriaSeleccionada = 'todos';
  mostrarSoloFavoritos = false;

  // Municipio elegido. Vacío = todo Casanare.
  municipioSeleccionado = '';

  // Municipios de Casanare, del catálogo compartido del proyecto.
  readonly municipios: readonly string[] = MUNICIPIOS_CASANARE;

  // Categorías para el desplegable (reemplazan la barra lateral).
  get listaCategorias(): Categoria[] {
    return this.truequesService.categorias();
  }

  // true cuando el panel de categorías está desplegado.
  categoriasAbiertas = false;

  get textoCategoria(): string {
    if (this.categoriaSeleccionada === 'todos') return 'Todas las categorías';
    const categoria = this.listaCategorias.find((c) => c.id === this.categoriaSeleccionada);
    return categoria ? categoria.nombre : 'Todas las categorías';
  }

  alternarCategorias(): void {
    this.categoriasAbiertas = !this.categoriasAbiertas;
  }

  // true cuando el panel de ubicación está desplegado.
  ubicacionAbierta = false;

  // Texto que muestra el botón de ubicación.
  get textoUbicacion(): string {
    return this.municipioSeleccionado || 'Todo Casanare';
  }

  // Aviso del municipio (data/avisos-ubicacion.json). Solo informativo.
  get avisoUbicacion(): AvisoUbicacion | undefined {
    return this.truequesService.avisoDeUbicacion(this.municipioSeleccionado);
  }

  alternarUbicacion(): void {
    this.ubicacionAbierta = !this.ubicacionAbierta;
  }

  cerrarUbicacion(): void {
    this.ubicacionAbierta = false;
  }

  // Catálogo único (data/categorias.json). Viene de un `computed` del servicio,
  // así que devuelve SIEMPRE la misma referencia hasta que cambian los datos.
  // No construir aquí un array nuevo: el sidebar lo recibe por @Input y Angular
  // lo vería como cambiado en cada ciclo de detección de cambios.

  beneficios = [
    {
      titulo: 'Trueques seguros',
      descripcion: 'Perfiles verificados y comunidad confiable.',
      icono: 'shield',
    },
    {
      titulo: 'Comunidad activa',
      descripcion: 'Miles de personas intercambiando cada día.',
      icono: 'users',
    },
    {
      titulo: 'Rápido y fácil',
      descripcion: 'Publica tu trueque en minutos y recibe propuestas.',
      icono: 'bolt',
    },
    {
      titulo: 'Atención 24/7',
      descripcion: 'Estamos para ayudarte en todo momento.',
      icono: 'chat',
    },
  ];

  // Avisos sin leer del usuario en sesión. Antes era un 2 fijo.
  get notificaciones(): number {
    return this.truequesService.notificacionesSinLeer();
  }

  // Foto del usuario en sesión, para el botón del header.
  get avatarUrl(): string {
    return this.truequesService.usuarioActual()?.avatar ?? 'https://i.pravatar.cc/80?img=68';
  }

  // true si hay una cuenta activa (no es una visita de invitado).
  get estaAutenticado(): boolean {
    return this.truequesService.autenticado();
  }

  // Nombre del usuario en sesión, para el mini menú de perfil.
  get nombreUsuario(): string {
    return this.truequesService.usuarioActual()?.nombre ?? 'Invitado';
  }


  // MINI MENÚ DE PERFIL Y NOTIFICACIONES (header)

  readonly menuPerfilAbierto = signal(false);
  readonly notificacionesAbiertas = signal(false);

  toggleMenuPerfil(): void {
    this.notificacionesAbiertas.set(false);
    this.menuPerfilAbierto.update((v) => !v);
  }

  toggleNotificaciones(): void {
    this.menuPerfilAbierto.set(false);
    this.notificacionesAbiertas.update((v) => !v);
  }

  // Últimos avisos para el mini panel de la campana ("solo para ver").
  get ultimasNotificaciones() {
    return this.truequesService.notificaciones().slice(0, 4);
  }

  // Cierra los menús del header y el de ubicación al hacer clic en cualquier otro lugar.
  @HostListener('document:click')
  cerrarMenusHeader(): void {
    this.menuPerfilAbierto.set(false);
    this.notificacionesAbiertas.set(false);
    this.redesSocialesAbiertas.set(false);
    this.cerrarUbicacion();
  }

  cerrarSesion(): void {
    this.truequesService.cerrarSesion();
    this.router.navigate(['/login']);
  }

  readonly redesSocialesAbiertas = signal(false);

  toggleRedesSociales(): void {
    this.redesSocialesAbiertas.update((v) => !v);
  }

  constructor(
    private truequesService: TruequesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.truequesService.cargar();
  }

  // Catálogo visible, ya resuelto contra usuarios y categorías.
  get trueques(): PublicacionVista[] {
    return this.truequesService.publicaciones();
  }

  // true mientras se cargan los JSON.
  get cargando(): boolean {
    return this.truequesService.cargando();
  }

  // Mensaje de error si los JSON no se pudieron cargar.
  get errorCarga(): string | null {
    return this.truequesService.error();
  }

  // Abre WhatsApp con el dueño. XchanGo no tiene chat interno.
  contactarPorWhatsApp(publicacion: PublicacionVista, evento?: Event): void {
    evento?.stopPropagation();
    const enlace = this.truequesService.enlaceWhatsApp(publicacion);
    if (enlace) {
      window.open(enlace, '_blank');
    }
  }

  // Combina búsqueda + tab (Bienes/Servicios/Digitales) + categoría del sidebar + solo-favoritos
  get truequesFiltrados(): PublicacionVista[] {
    let resultado = this.trueques;

    if (this.mostrarSoloFavoritos) {
      resultado = resultado.filter((t) => t.favorito);
    }

    // Un bien digital no tiene municipio: se entrega de una vez,
    // por eso se muestra siempre sin importar el filtro de ubicación.
    if (this.municipioSeleccionado) {
      resultado = resultado.filter(
        (t) => t.tipo === 'bien_digital' || t.ciudad === this.municipioSeleccionado,
      );
    }

    if (this.filtroActivo !== 'todos') {
      const tipo = TIPO_POR_FILTRO[this.filtroActivo];
      resultado = resultado.filter((t) => t.tipo === tipo);
    }

    if (this.categoriaSeleccionada !== 'todos') {
      resultado = resultado.filter((t) => t.categoriaId === this.categoriaSeleccionada);
    }

    if (this.busqueda.trim()) {
      const termino = this.busqueda.trim().toLowerCase();
      resultado = resultado.filter(
        (t) =>
          t.titulo.toLowerCase().includes(termino) ||
          t.autor.toLowerCase().includes(termino) ||
          t.ciudad.toLowerCase().includes(termino),
      );
    }

    return resultado;
  }

  get cantidadFavoritos(): number {
    return this.trueques.filter((t) => t.favorito).length;
  }

  // "Carlos Ospina" -> "Carlos O." para que quepa junto a la ciudad.
  nombreCorto(nombre: string): string {
    const partes = nombre.trim().split(' ');
    if (partes.length < 2) return nombre;
    return partes[0] + ' ' + partes[1].charAt(0) + '.';
  }

  trackPorId(_indice: number, t: PublicacionVista): string {
    return t.id;
  }


  // Filtra las publicaciones por municipio.
  // Filtra las publicaciones por municipio y cierra el panel.
  seleccionarMunicipio(municipio: string): void {
    this.municipioSeleccionado = municipio;
    this.ubicacionAbierta = false;
  }

  seleccionarFiltro(filtro: FiltroTrueque): void {
    this.filtroActivo = filtro;

    // "Todos" limpia TODO: tipo, categoría, municipio, búsqueda y favoritos,
    // para que de verdad se vean todos los trueques.
    if (filtro === 'todos') {
      this.categoriaSeleccionada = 'todos';
      this.municipioSeleccionado = '';
      this.mostrarSoloFavoritos = false;
      this.busqueda = '';
    }
  }

  seleccionarCategoria(id: string): void {
    this.categoriaSeleccionada = id;
    this.categoriasAbiertas = false;
  }

  irAInicio(): void {
    this.mostrarSoloFavoritos = false;
    this.filtroActivo = 'todos';
    this.categoriaSeleccionada = 'todos';
    this.busqueda = '';
  }

  verSoloFavoritos(): void {
    this.mostrarSoloFavoritos = true;
  }

  alternarFavorito(trueque: PublicacionVista, evento: Event): void {
    evento.stopPropagation();
    this.truequesService.alternarFavorito(trueque);
  }

  limpiarFiltros(): void {
    this.busqueda = '';
    this.filtroActivo = 'todos';
    this.categoriaSeleccionada = 'todos';
    this.mostrarSoloFavoritos = false;
  }

  // Clase del badge por TIPO. Reutiliza SOLO clases que ya existen en tu CSS
  // (badge--bienes, badge--servicios, badge--electronicos). Cero cambios de
  // estilo.
  claseBadge(tipo: TipoPublicacion): string {
    return this.truequesService.claseBadge(tipo);
  }

  // Abre el formulario para crear una publicación.
  publicarTrueque(): void {
    this.router.navigate(['/trueque']);
  }

  manejarErrorImagen(evento: Event): void {
    const img = evento.target as HTMLImageElement;
    img.src = 'https://placehold.co/600x450/ece2c9/1f1b16?text=Sin+imagen';
  }

  // Navega a la página de detalle del trueque (/trueque/:id).
  // Publicación abierta en el modal. null = no hay ninguno abierto.
  // Se abre ENCIMA del home para que el fondo se vea difuminado detrás,
  // igual que el modal de inicio de sesión.
  detalleAbierto: string | null = null;

  irADetalle(trueque: PublicacionVista): void {
    this.detalleAbierto = trueque.id;
    // Bloquea el scroll del fondo mientras el modal está abierto.
    document.body.style.overflow = 'hidden';
  }

  cerrarDetalle(): void {
    this.detalleAbierto = null;
    document.body.style.overflow = '';
  }
}