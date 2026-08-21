import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface TipoIntercambio {
  id: string;
  titulo: string;
  descripcion: string;
  icono: string;      // nombre de material icon
  colorClase: string; // clase css para el color del icono/tarjeta
}

// Municipios de Casanare (único departamento manejado por la plataforma)
const MUNICIPIOS_CASANARE: string[] = [
  'Yopal',
  'Aguazul',
  'Chámeza',
  'Hato Corozal',
  'La Salina',
  'Maní',
  'Monterrey',
  'Nunchía',
  'Orocué',
  'Paz de Ariporo',
  'Pore',
  'Recetor',
  'Sabanalarga',
  'Sácama',
  'San Luis de Palenque',
  'Támara',
  'Tauramena',
  'Trinidad',
  'Villanueva'
];

@Component({
  selector: 'app-formulario-crear-trueques',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-crear-trueques.html',
  styleUrls: ['./formulario-crear-trueques.css']
})
export class formulario_crear_truequesComponent implements OnInit {

  // ---------------------------------------------------------
  // 1. Tipos de intercambio (tarjetas seleccionables)
  // ---------------------------------------------------------
  tiposIntercambio: TipoIntercambio[] = [
    {
      id: 'fisico',
      titulo: 'Bien físico',
      descripcion: 'Ofrece productos tangibles como ropa, libros, Electronicos y más.',
      icono: 'inventory_2',
      colorClase: 'icono-azul'
    },
    {
      id: 'servicio',
      titulo: 'Servicio',
      descripcion: 'Ofrece tus habilidades o servicios que otros puedan necesitar.',
      icono: 'handshake',
      colorClase: 'icono-verde'
    },
    {
      id: 'digital',
      titulo: 'Bien digital',
      descripcion: 'Ofrece productos digitales como archivos, cursos, plantillas y más.',
      icono: 'computer',
      colorClase: 'icono-morado'
    }
  ];

  // ---------------------------------------------------------
  // 2. Catálogos usados en los selects
  // ---------------------------------------------------------
  categorias: string[] = [
    'Tecnología',
    'Ropa y accesorios',
    'Hogar',
    'Libros y educación',
    'Deportes',
    'Servicios profesionales',
    'Arte y manualidades',
    'Otros'
  ];

  opcionesDisponibilidad: string[] = [
    'Inmediata',
    'Fines de semana',
    'Entre semana',
    'Horario flexible',
    'Por acordar'
  ];

  // Departamento fijo: la plataforma solo opera en Casanare
  readonly departamento = 'Casanare';
  municipiosCasanare: string[] = MUNICIPIOS_CASANARE;

  // ---------------------------------------------------------
  // 3. Estado del formulario
  // ---------------------------------------------------------
  form!: FormGroup;

  imagenes: File[] = [];
  imagenesPreviewUrls: string[] = [];
  indiceImagenVistaPrevia = 0;
  readonly maxImagenes = 5;
  readonly maxDescripcion = 500;
  arrastrandoArchivo = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.asegurarFuenteMaterialIcons();
  }

  /**
   * Inyecta el link de Google Fonts para Material Icons si el proyecto
   * todavía no lo tiene cargado (evita que los íconos se vean como texto,
   * ej: "inventory_2" en vez del ícono real).
   */
  private asegurarFuenteMaterialIcons(): void {
    const idLink = 'material-icons-font';
    if (document.getElementById(idLink)) {
      return;
    }
    const link = document.createElement('link');
    link.id = idLink;
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
    document.head.appendChild(link);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      tipoIntercambio: ['fisico', Validators.required],
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.maxLength(this.maxDescripcion)]],
      ofreces: [''],
      buscas: [''],
      disponibilidad: ['', Validators.required],
      cantidad: [''],
      estado: [true],
      municipio: ['', Validators.required],
      barrio: ['']
    });
  }

  // ---------------------------------------------------------
  // Helpers de plantilla
  // ---------------------------------------------------------
  seleccionarTipo(id: string): void {
    this.form.get('tipoIntercambio')?.setValue(id);
  }

  get tipoSeleccionado(): TipoIntercambio | undefined {
    return this.tiposIntercambio.find(t => t.id === this.form.get('tipoIntercambio')?.value);
  }

  get tituloVistaPrevia(): string {
    return this.tiposIntercambio.map(t => t.titulo).join(' | ');
  }

  get descripcionRestante(): number {
    const valor = this.form.get('descripcion')?.value || '';
    return this.maxDescripcion - valor.length;
  }

  // ---------------------------------------------------------
  // Manejo de imágenes (drag & drop + input)
  // ---------------------------------------------------------
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.arrastrandoArchivo = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.arrastrandoArchivo = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.arrastrandoArchivo = false;
    if (event.dataTransfer?.files) {
      this.agregarImagenes(event.dataTransfer.files);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.agregarImagenes(input.files);
    }
    input.value = '';
  }

  private agregarImagenes(files: FileList): void {
    const disponibles = this.maxImagenes - this.imagenes.length;
    Array.from(files)
      .slice(0, disponibles)
      .forEach(file => {
        if (!file.type.match(/image\/(jpeg|png)/)) return;
        if (file.size > 5 * 1024 * 1024) return; // máx 5MB

        // Reasigna el arreglo (en vez de mutar con push) para que Angular
        // detecte el cambio incluso con estrategias de detección estrictas.
        this.imagenes = [...this.imagenes, file];

        const reader = new FileReader();
        reader.onload = () => {
          this.imagenesPreviewUrls = [...this.imagenesPreviewUrls, reader.result as string];
          this.cdr.detectChanges();
        };
        reader.readAsDataURL(file);
      });
  }

  eliminarImagen(index: number): void {
    this.imagenes = this.imagenes.filter((_, i) => i !== index);
    this.imagenesPreviewUrls = this.imagenesPreviewUrls.filter((_, i) => i !== index);

    if (this.indiceImagenVistaPrevia >= this.imagenesPreviewUrls.length) {
      this.indiceImagenVistaPrevia = Math.max(0, this.imagenesPreviewUrls.length - 1);
    }
  }

  imagenAnterior(): void {
    this.indiceImagenVistaPrevia =
      (this.indiceImagenVistaPrevia - 1 + this.imagenesPreviewUrls.length) % this.imagenesPreviewUrls.length;
  }

  imagenSiguiente(): void {
    this.indiceImagenVistaPrevia =
      (this.indiceImagenVistaPrevia + 1) % this.imagenesPreviewUrls.length;
  }

  // ---------------------------------------------------------
  // Navegación / envío
  // ---------------------------------------------------------
  seleccionarUbicacionEnMapa(): void {
    // Aquí se integraría el selector de ubicación (Google Maps / Leaflet, etc.)
    console.log('Abrir selector de ubicación en el mapa');
  }

  volver(): void {
    this.router.navigate(['/']);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('departamento', this.departamento);
    Object.entries(this.form.getRawValue()).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
    this.imagenes.forEach(img => formData.append('imagenes', img));

    // TODO: reemplazar por la llamada real al servicio de trueques
    console.log('Publicación lista para enviar:', this.form.getRawValue(), this.imagenes);
  }
}