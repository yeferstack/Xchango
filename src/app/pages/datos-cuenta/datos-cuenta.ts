import { Component, signal } from '@angular/core';
import { IconoComponent } from '../../components/icono/icono';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-datos-cuenta',
    standalone: true,
    imports: [IconoComponent, CommonModule, FormsModule, RouterLink],
    templateUrl: './datos-cuenta.html',
    styleUrl: './datos-cuenta.css'
})
export class DatosCuentaComponent {

    /* --- Datos de la cuenta --- */
    correo = signal('miguel.perez@gmail.com');
    usuario = signal('@miguelperez');
    idCuenta = signal('XCH-2026-0418');
    fechaRegistro = signal('18 de marzo de 2026');
    tipoCuenta = signal('Personal');
    correoVerificado = signal(true);

    /* --- Campo que se está editando (null = ninguno) --- */
    editando = signal<string | null>(null);
    valorTemporal = signal('');

    /* --- Preferencias --- */
    preferencias = signal([
        { id: 'correos', titulo: 'Correos de novedades', detalle: 'Recibe noticias y actualizaciones de XchanGo.', activo: true },
        { id: 'resumen', titulo: 'Resumen semanal', detalle: 'Un correo con el movimiento de tus trueques.', activo: false },
        { id: 'sesion', titulo: 'Mantener sesión iniciada', detalle: 'No cerrar sesión automáticamente en este navegador.', activo: true }
    ]);

    // Aviso verde que aparece al guardar. Se borra solo a los 3 segundos.
    mensajeExito = '';

    // Modal de confirmación. null = cerrado.
    confirmacion: { titulo: string; texto: string; accion: 'desactivar' | 'eliminar' } | null = null;

    constructor(private location: Location) { }

    // Muestra un aviso y lo quita después de un momento.
    private avisar(texto: string): void {
        this.mensajeExito = texto;
        setTimeout(() => (this.mensajeExito = ''), 3000);
    }

    guardarCambios(): void {
        this.avisar('Cambios guardados correctamente.');
    }

    pedirDesactivar(): void {
        this.confirmacion = {
            titulo: '¿Desactivar tu cuenta?',
            texto: 'Tu perfil y tus publicaciones dejarán de verse hasta que vuelvas a entrar.',
            accion: 'desactivar',
        };
    }

    pedirEliminar(): void {
        this.confirmacion = {
            titulo: '¿Eliminar tu cuenta?',
            texto: 'Se borran tus publicaciones, trueques y calificaciones. Esta acción no se puede deshacer.',
            accion: 'eliminar',
        };
    }

    cerrarConfirmacion(): void {
        this.confirmacion = null;
    }

    confirmarAccion(): void {
        const accion = this.confirmacion?.accion;
        this.confirmacion = null;

        if (accion === 'desactivar') {
            this.avisar('Tu cuenta quedó desactivada. Vuelve a entrar para reactivarla.');
        } else if (accion === 'eliminar') {
            this.avisar('Solicitud de eliminación registrada. Te confirmaremos por correo.');
        }
    }

    /* --- Edición en línea --- */
    iniciarEdicion(campo: string, valorActual: string): void {
        this.editando.set(campo);
        this.valorTemporal.set(valorActual);
    }

    cancelarEdicion(): void {
        this.editando.set(null);
        this.valorTemporal.set('');
    }

    guardarEdicion(campo: string): void {
        const nuevo = this.valorTemporal().trim();
        if (!nuevo) return;

        if (campo === 'correo') {
            this.correo.set(nuevo);
            this.correoVerificado.set(false);
        }
        if (campo === 'usuario') {
            this.usuario.set(nuevo.startsWith('@') ? nuevo : '@' + nuevo);
        }

        this.cancelarEdicion();
    }

    togglePreferencia(id: string): void {
        this.preferencias.update(lista =>
            lista.map(p => (p.id === id ? { ...p, activo: !p.activo } : p))
        );
    }

    volver(): void {
        this.location.back();
    }
}