import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface RolUsuario {
  id: 'administrador' | 'moderador';
  titulo: string;
  descripcion: string;
  icono: string;
  colorClase: string;
}

@Component({
  selector: 'app-formulario-crear-usuario-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-crear-usuario-admin.html',
  styleUrls: ['./formulario-crear-usuario-admin.css']
})
export class FormularioCrearUsuarioAdminComponent implements OnInit {

  // ---------------------------------------------------------
  // Roles disponibles (tarjetas seleccionables)
  // ---------------------------------------------------------
  roles: RolUsuario[] = [
    {
      id: 'administrador',
      titulo: 'Administrador',
      descripcion: 'Acceso total a la plataforma. Puede gestionar usuarios, configuraciones, reportes y todos los módulos del sistema.',
      icono: 'shield',
      colorClase: 'icono-accent'
    },
    {
      id: 'moderador',
      titulo: 'Moderador',
      descripcion: 'Puede revisar y gestionar publicaciones, reportes y usuarios. No tiene acceso a configuraciones críticas del sistema.',
      icono: 'verified_user',
      colorClase: 'icono-verde'
    }
  ];

  // ---------------------------------------------------------
  // Estado del formulario
  // ---------------------------------------------------------
  form!: FormGroup;

  mostrarContrasena = false;
  mostrarConfirmarContrasena = false;

  readonly maxNotas = 200;
  readonly fechaCreacion = new Date();

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
      nombreCompleto: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: [''],
      nombreUsuario: ['', Validators.required],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
      confirmarContrasena: ['', Validators.required],
      rol: ['administrador', Validators.required],
      estado: ['activo', Validators.required],
      notas: ['', Validators.maxLength(this.maxNotas)]
    });
  }

  // ---------------------------------------------------------
  // Helpers de plantilla
  // ---------------------------------------------------------
  seleccionarRol(id: 'administrador' | 'moderador'): void {
    this.form.get('rol')?.setValue(id);
  }

  get rolSeleccionado(): RolUsuario | undefined {
    return this.roles.find(r => r.id === this.form.get('rol')?.value);
  }

  seleccionarEstado(estado: 'activo' | 'inactivo'): void {
    this.form.get('estado')?.setValue(estado);
  }

  get notasRestantes(): number {
    const valor = this.form.get('notas')?.value || '';
    return this.maxNotas - valor.length;
  }

  get fechaCreacionFormateada(): string {
    const dia = String(this.fechaCreacion.getDate()).padStart(2, '0');
    const mes = String(this.fechaCreacion.getMonth() + 1).padStart(2, '0');
    const anio = this.fechaCreacion.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }

  get nombreCompletoVistaPrevia(): string {
    return this.form.get('nombreCompleto')?.value || 'Juan Pérez Gómez';
  }

  get correoVistaPrevia(): string {
    return this.form.get('correo')?.value || 'juan@correo.com';
  }

  get usuarioVistaPrevia(): string {
    return this.form.get('nombreUsuario')?.value || 'juanperez';
  }

  togglMostrarContrasena(): void {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  toggleMostrarConfirmarContrasena(): void {
    this.mostrarConfirmarContrasena = !this.mostrarConfirmarContrasena;
  }

  /** Valida que la confirmación de contraseña coincida con la contraseña */
  get contrasenasNoCoinciden(): boolean {
    const contrasena = this.form.get('contrasena')?.value;
    const confirmar = this.form.get('confirmarContrasena')?.value;
    return !!confirmar && contrasena !== confirmar;
  }

  // ---------------------------------------------------------
  // Navegación / envío
  // ---------------------------------------------------------
  cancelar(): void {
    this.router.navigate(['/']);
  }

  volver(): void {
    this.router.navigate(['/']);
  }

  onSubmit(): void {
    if (this.form.invalid || this.contrasenasNoCoinciden) {
      this.form.markAllAsTouched();
      return;
    }

    const { confirmarContrasena, ...datosUsuario } = this.form.getRawValue();

    // TODO: reemplazar por la llamada real al servicio de usuarios internos
    console.log('Usuario administrativo listo para crear:', {
      ...datosUsuario,
      fechaCreacion: this.fechaCreacion
    });
  }
}