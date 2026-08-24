import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { IconoComponent } from '../../../components/icono/icono';
import { AdminsAdminService } from '../../../services/admin/admins-admin.service';

interface RolUsuario {
  id: 'administrador' | 'moderador';
  titulo: string;
  descripcion: string;
  icono: string;
  colorClase: string;
}

/**
 * Crear usuarios internos (moderadores).
 *
 * Solo el administrador puede entrar aquí. El moderador no crea usuarios,
 * por eso la ruta usa el guard `soloAdminGuard`.
 */
@Component({
  selector: 'app-formulario-crear-usuario-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconoComponent],
  templateUrl: './formulario-crear-usuario-admin.html',
  styleUrls: ['./formulario-crear-usuario-admin.css'],
})
export class FormularioCrearUsuarioAdminComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private adminsSrv = inject(AdminsAdminService);

  /** Tarjetas de rol que se pueden elegir. */
  roles: RolUsuario[] = [
    {
      id: 'moderador',
      titulo: 'Moderador',
      descripcion:
        'Revisa y gestiona publicaciones, reportes y usuarios. No puede crear otros usuarios ni entrar a la configuración del sistema.',
      icono: 'verified_user',
      colorClase: 'icono-verde',
    },
    {
      id: 'administrador',
      titulo: 'Administrador',
      descripcion:
        'Acceso total: gestiona usuarios, moderadores, reportes y todos los módulos de la plataforma.',
      icono: 'shield',
      colorClase: 'icono-accent',
    },
  ];

  form!: FormGroup;
  mostrarContrasena = false;
  mostrarConfirmarContrasena = false;
  mensajeError = '';

  readonly maxNotas = 200;
  readonly fechaCreacion = new Date();

  ngOnInit(): void {
    this.adminsSrv.cargar();

    this.form = this.fb.group({
      nombreCompleto: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: [''],
      nombreUsuario: ['', Validators.required],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
      confirmarContrasena: ['', Validators.required],
      rol: ['moderador', Validators.required],
      estado: ['activo', Validators.required],
      notas: ['', Validators.maxLength(this.maxNotas)],
    });
  }

  // ---------------------------------------------------------
  // Ayudas para la plantilla
  // ---------------------------------------------------------

  seleccionarRol(id: 'administrador' | 'moderador'): void {
    this.form.get('rol')?.setValue(id);
  }

  get rolSeleccionado(): RolUsuario | undefined {
    return this.roles.find((r) => r.id === this.form.get('rol')?.value);
  }

  seleccionarEstado(estado: 'activo' | 'inactivo'): void {
    this.form.get('estado')?.setValue(estado);
  }

  get fechaCreacionFormateada(): string {
    const dia = String(this.fechaCreacion.getDate()).padStart(2, '0');
    const mes = String(this.fechaCreacion.getMonth() + 1).padStart(2, '0');
    const anio = this.fechaCreacion.getFullYear();
    return dia + '/' + mes + '/' + anio;
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

  /** Revisa que la confirmación sea igual a la contraseña. */
  get contrasenasNoCoinciden(): boolean {
    const contrasena = this.form.get('contrasena')?.value;
    const confirmar = this.form.get('confirmarContrasena')?.value;
    return !!confirmar && contrasena !== confirmar;
  }

  // ---------------------------------------------------------
  // Navegación y guardado
  // ---------------------------------------------------------

  cancelar(): void {
    this.router.navigate(['/admin/administracion']);
  }

  volver(): void {
    this.router.navigate(['/admin/administracion']);
  }

  onSubmit(): void {
    this.mensajeError = '';

    if (this.form.invalid || this.contrasenasNoCoinciden) {
      this.form.markAllAsTouched();
      this.mensajeError = 'Revisa los campos marcados antes de continuar.';
      return;
    }

    const v = this.form.getRawValue();

    const error = this.adminsSrv.crearUsuarioInterno({
      nombre: v.nombreCompleto,
      email: v.correo,
      password: v.contrasena,
      rol: v.rol === 'administrador' ? 'admin' : 'moderador',
      estado: v.estado === 'activo' ? 'activo' : 'inactivo',
    });

    if (error) {
      this.mensajeError = error;
      return;
    }

    this.router.navigate(['/admin/administracion']);
  }
}
