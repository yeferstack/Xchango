import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Representa una zona de carga de imagen individual (perfil, frente o reverso)
interface CampoImagen {
  archivo: File | null;
  previewUrl: string | null;
  arrastrando: boolean;
}

type ClaveImagen = 'perfil' | 'documentoFrente' | 'documentoReverso';

@Component({
  selector: 'app-formulario-crear-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-crear-usuario.html',
  styleUrls: ['./formulario-crear-usuario.css']
})
export class FormularioCrearUsuarioComponent implements OnInit {

  // ---------------------------------------------------------
  // Catálogos usados en los selects
  // ---------------------------------------------------------
  opcionesSexo: string[] = ['Masculino', 'Femenino', 'Otro', 'Prefiero no decir'];

  tiposDocumento: string[] = [
    'Cédula de ciudadanía',
    'Cédula de extranjería',
    'Tarjeta de identidad',
    'Pasaporte'
  ];

  // ---------------------------------------------------------
  // Estado del formulario
  // ---------------------------------------------------------
  form!: FormGroup;

  // Una entrada por cada zona de carga de imagen del formulario
  imagenes: Record<ClaveImagen, CampoImagen> = {
    perfil: { archivo: null, previewUrl: null, arrastrando: false },
    documentoFrente: { archivo: null, previewUrl: null, arrastrando: false },
    documentoReverso: { archivo: null, previewUrl: null, arrastrando: false }
  };

  readonly fechaRegistro = new Date();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.asegurarFuenteMaterialIcons();
  }

  /**
   * Inyecta el link de Google Fonts para Material Icons si el proyecto
   * todavía no lo tiene cargado (evita que los íconos se vean como texto).
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
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      sexo: ['', Validators.required],
      direccion: ['', Validators.required],
      ciudad: ['', Validators.required],
      estadoProvincia: ['', Validators.required],
      barrio: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', Validators.required]
    });
  }

  // ---------------------------------------------------------
  // Helpers de plantilla
  // ---------------------------------------------------------
  get nombreCompleto(): string {
    const nombres = this.form.get('nombres')?.value || '';
    const apellidos = this.form.get('apellidos')?.value || '';
    const nombreCompleto = `${nombres} ${apellidos}`.trim();
    return nombreCompleto || 'Juan Pérez';
  }

  get ubicacionVistaPrevia(): string {
    const ciudad = this.form.get('ciudad')?.value;
    const estado = this.form.get('estadoProvincia')?.value;
    if (ciudad && estado) return `${ciudad}, ${estado}`;
    return 'Yopal, Casanare';
  }

  get telefonoVistaPrevia(): string {
    return this.form.get('telefono')?.value || '+57 300 123 4567';
  }

  get emailVistaPrevia(): string {
    return this.form.get('email')?.value || 'juan@correo.com';
  }

  get fechaRegistroFormateada(): string {
    const dia = String(this.fechaRegistro.getDate()).padStart(2, '0');
    const mes = String(this.fechaRegistro.getMonth() + 1).padStart(2, '0');
    const anio = this.fechaRegistro.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }

  // ---------------------------------------------------------
  // Manejo de imágenes (drag & drop + input) — genérico para
  // perfil, frente y reverso del documento
  // ---------------------------------------------------------
  onDragOver(event: DragEvent, clave: ClaveImagen): void {
    event.preventDefault();
    this.imagenes[clave] = { ...this.imagenes[clave], arrastrando: true };
  }

  onDragLeave(event: DragEvent, clave: ClaveImagen): void {
    event.preventDefault();
    this.imagenes[clave] = { ...this.imagenes[clave], arrastrando: false };
  }

  onDrop(event: DragEvent, clave: ClaveImagen): void {
    event.preventDefault();
    this.imagenes[clave] = { ...this.imagenes[clave], arrastrando: false };
    if (event.dataTransfer?.files?.length) {
      this.asignarImagen(event.dataTransfer.files[0], clave);
    }
  }

  onFileSelected(event: Event, clave: ClaveImagen): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.asignarImagen(input.files[0], clave);
    }
    input.value = '';
  }

  private asignarImagen(file: File, clave: ClaveImagen): void {
    if (!file.type.match(/image\/(jpeg|png)/)) return;
    if (file.size > 5 * 1024 * 1024) return; // máx 5MB

    const reader = new FileReader();
    reader.onload = () => {
      this.imagenes[clave] = {
        archivo: file,
        previewUrl: reader.result as string,
        arrastrando: false
      };
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);
  }

  quitarImagen(clave: ClaveImagen): void {
    this.imagenes[clave] = { archivo: null, previewUrl: null, arrastrando: false };
  }

  // ---------------------------------------------------------
  // Navegación / envío
  // ---------------------------------------------------------
  volver(): void {
    this.router.navigate(['/']);
  }

  onSubmit(): void {
    const faltaFotoPerfil = !this.imagenes.perfil.archivo;
    const faltaDocumentoFrente = !this.imagenes.documentoFrente.archivo;
    const faltaDocumentoReverso = !this.imagenes.documentoReverso.archivo;

    if (this.form.invalid || faltaFotoPerfil || faltaDocumentoFrente || faltaDocumentoReverso) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    Object.entries(this.form.getRawValue()).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
    formData.append('fotoPerfil', this.imagenes.perfil.archivo as File);
    formData.append('documentoFrente', this.imagenes.documentoFrente.archivo as File);
    formData.append('documentoReverso', this.imagenes.documentoReverso.archivo as File);

    // TODO: reemplazar por la llamada real al servicio de usuarios
    console.log('Usuario listo para crear:', this.form.getRawValue(), {
      fotoPerfil: this.imagenes.perfil.archivo,
      documentoFrente: this.imagenes.documentoFrente.archivo,
      documentoReverso: this.imagenes.documentoReverso.archivo
    });
  }
}