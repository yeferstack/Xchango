import { Component } from "@angular/core";
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

  // La contraseña hace falta para poder iniciar sesión después.
  // Paso actual del registro: primero el correo, luego el código, luego el formulario.
  readonly paso = signal<'correo' | 'verificar' | 'formulario'>('correo');

  errorRegistro = "";

  private servicio = inject(TruequesService);

  private readonly router = inject(Router);

  fotoPerfilArchivo: File | null = null;
  fotoPerfilNombre = "";
  isDragOver = false;

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

  onFotoPerfilSeleccionada(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
    this.asignarFotoPerfil(input.files[0]);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;

    const archivo = event.dataTransfer?.files?.[0];
    if (archivo) {
      this.asignarFotoPerfil(archivo);
    }
  }

  private asignarFotoPerfil(archivo: File): void {
    if (!this.tiposPermitidos.includes(archivo.type)) {
      console.warn("Formato no permitido. Usa JPG o PNG.");
      return;
    }
    if (archivo.size > this.tamanoMaximoBytes) {
      console.warn("El archivo supera el máximo de 5MB.");
      return;
    }
    this.fotoPerfilArchivo = archivo;
    this.fotoPerfilNombre = archivo.name;
  }

  // Paso 1: solo el correo. Si el formato es válido y no está ya registrado, sigue a verificar.
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

    const nombre = (this.modelo.nombres + " " + this.modelo.apellidos).trim();
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