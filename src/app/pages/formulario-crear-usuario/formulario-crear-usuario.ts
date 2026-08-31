import { Component, ChangeDetectorRef } from "@angular/core";
import { inject, signal } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { TruequesService } from "../../services/trueques";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { VerificarCodigoComponent } from "../../layout/verificar-codigo/verificar-codigo";

interface RegistroUsuario {
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;
  sexo: string;
  direccion: string;
  ciudad: string;
  estado: string;
  barrio: string;
  email: string;
  telefono: string;
  tipoDocumento: string;
  numeroDocumento: string;
}

interface Opcion {
  value: string;
  label: string;
}

// Representa una zona de carga de imagen individual (perfil, frente o reverso)
interface CampoImagen {
  archivo: File | null;
  previewUrl: string | null;
  arrastrando: boolean;
}

type ClaveImagen = "perfil" | "documentoFrente" | "documentoReverso";

@Component({
  selector: "formulario-crear-usuario",
  standalone: true,
  imports: [CommonModule, FormsModule, VerificarCodigoComponent, RouterLink],
  templateUrl: "./formulario-crear-usuario.html",
  styleUrls: ["./formulario-crear-usuario.css"],
})
export class FormularioCrearUsuarioComponent {
  modelo: RegistroUsuario = {
    nombres: "",
    apellidos: "",
    fechaNacimiento: "",
    sexo: "",
    direccion: "",
    ciudad: "",
    estado: "",
    barrio: "",
    email: "",
    telefono: "+57 ",
    tipoDocumento: "",
    numeroDocumento: "",
  };

  // Paso actual del registro: primero el correo, luego el código, luego el formulario.
  readonly paso = signal<'correo' | 'verificar' | 'formulario'>('correo');

  errorRegistro = "";

  private servicio = inject(TruequesService);

  private readonly router = inject(Router);

  private readonly cdr = inject(ChangeDetectorRef);

  // Datos de los <select>: cada uno se recorre en el HTML con *ngFor.
  readonly opcionesSexo: Opcion[] = [
    { value: "femenino", label: "Femenino" },
    { value: "masculino", label: "Masculino" },
    { value: "otro", label: "Otro" },
  ];

  readonly tiposDocumento: Opcion[] = [
    { value: "cc", label: "Cédula de ciudadanía" },
    { value: "ce", label: "Cédula de extranjería" },
    { value: "ti", label: "Tarjeta de identidad" },
    { value: "pasaporte", label: "Pasaporte" },
  ];

  private readonly tiposPermitidos = ["image/png", "image/jpeg"];
  private readonly tamanoMaximoBytes = 5 * 1024 * 1024; // 5MB

  readonly fechaRegistro = new Date();

  // Una entrada por cada zona de carga de imagen del paso 3
  imagenes: Record<ClaveImagen, CampoImagen> = {
    perfil: { archivo: null, previewUrl: null, arrastrando: false },
    documentoFrente: { archivo: null, previewUrl: null, arrastrando: false },
    documentoReverso: { archivo: null, previewUrl: null, arrastrando: false },
  };

  constructor() {
    this.asegurarFuenteMaterialIcons();
  }

  /**
   * Inyecta el link de Google Fonts para Material Icons si el proyecto
   * todavía no lo tiene cargado (evita que los íconos se vean como texto).
   */
  private asegurarFuenteMaterialIcons(): void {
    const idLink = "material-icons-font";
    if (document.getElementById(idLink)) {
      return;
    }
    const link = document.createElement("link");
    link.id = idLink;
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
    document.head.appendChild(link);
  }

  // ---------------------------------------------------------
  // Vista previa (columna derecha del paso 3)
  // ---------------------------------------------------------
  get nombreCompleto(): string {
    const nombreCompleto = `${this.modelo.nombres} ${this.modelo.apellidos}`.trim();
    return nombreCompleto || "Juan Pérez";
  }

  get ubicacionVistaPrevia(): string {
    if (this.modelo.ciudad && this.modelo.estado) {
      return `${this.modelo.ciudad}, ${this.modelo.estado}`;
    }
    return "Yopal, Casanare";
  }

  get telefonoVistaPrevia(): string {
    return this.modelo.telefono || "+57 300 123 4567";
  }

  get emailVistaPrevia(): string {
    return this.modelo.email || "juan@correo.com";
  }

  get fechaRegistroFormateada(): string {
    const dia = String(this.fechaRegistro.getDate()).padStart(2, "0");
    const mes = String(this.fechaRegistro.getMonth() + 1).padStart(2, "0");
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
    input.value = "";
  }

  private asignarImagen(file: File, clave: ClaveImagen): void {
    if (!this.tiposPermitidos.includes(file.type)) {
      console.warn("Formato no permitido. Usa JPG o PNG.");
      return;
    }
    if (file.size > this.tamanoMaximoBytes) {
      console.warn("El archivo supera el máximo de 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.imagenes[clave] = {
        archivo: file,
        previewUrl: reader.result as string,
        arrastrando: false,
      };
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);
  }

  quitarImagen(clave: ClaveImagen): void {
    this.imagenes[clave] = { archivo: null, previewUrl: null, arrastrando: false };
  }

  // ---------------------------------------------------------
  // Paso 1: solo el correo. Si el formato es válido y no está ya
  // registrado, sigue a verificar.
  // ---------------------------------------------------------
  continuarConCorreo(): void {
    this.errorRegistro = "";
    const correo = this.modelo.email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      this.errorRegistro = "Ingresa un correo válido.";
      return;
    }
    if (this.servicio.correoRegistrado(correo)) {
      this.errorRegistro = "Ese correo ya tiene una cuenta. Inicia sesión en vez de registrarte.";
      return;
    }

    this.modelo.email = correo;
    this.paso.set('verificar');
  }

  // Paso 2: código verificado, ahora sí se llena el resto de los datos.
  onCodigoVerificado(): void {
    this.paso.set('formulario');
  }

  // Paso 3: formulario completo, ya se registra de verdad.
  onSubmit(): void {
    this.errorRegistro = "";

    if (!this.imagenes.perfil.archivo) {
      this.errorRegistro = "Sube tu foto de perfil antes de continuar.";
      return;
    }
    if (this.modelo.tipoDocumento && !this.imagenes.documentoFrente.archivo) {
      this.errorRegistro = "Sube la foto del frente de tu documento.";
      return;
    }
    if (this.modelo.tipoDocumento && !this.imagenes.documentoReverso.archivo) {
      this.errorRegistro = "Sube la foto del reverso de tu documento.";
      return;
    }

    const nombre = (this.modelo.nombres + " " + this.modelo.apellidos).trim();

    // TODO: confirmar si TruequesService.registrar acepta los archivos
    // (fotoPerfil / documentoFrente / documentoReverso) o si hace falta
    // subirlos aparte (ej. a un storage) antes de llamar a registrar().
    const mensaje = this.servicio.registrar({
      nombre: nombre,
      email: this.modelo.email,
      telefono: this.modelo.telefono,
      ubicacion: this.modelo.ciudad || "Yopal",
    });

    if (mensaje) {
      this.errorRegistro = mensaje;
      return;
    }

    // Ya quedó registrado y con la sesión abierta.
    this.router.navigate(["/home"]);
  }
}