import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type SeccionSeguridad = 'verificacion' | 'dispositivos' | 'alertas' | null;

interface OpcionToggle {
    id: string;
    titulo: string;
    descripcion: string;
    activo: boolean;
}

interface Dispositivo {
    id: number;
    nombre: string;
    sistema: string;
    ubicacion: string;
    ultimoAcceso: string;
    actual: boolean;
}

@Component({
    selector: 'app-seguridad',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './seguridad.html',
    styleUrls: ['./seguridad.css'],
})
export class SeguridadComponent {
    seccionAbierta: SeccionSeguridad = null;
    mensaje = '';

    metodosVerificacion: OpcionToggle[] = [
        {
            id: 'correo',
            titulo: 'Código por correo',
            descripcion: 'Enviamos un código a tu correo cada vez que inicias sesión.',
            activo: true,
        },
        {
            id: 'sms',
            titulo: 'Código por SMS',
            descripcion: 'Recibe el código en tu número de celular registrado.',
            activo: false,
        },
        {
            id: 'app',
            titulo: 'Aplicación de autenticación',
            descripcion: 'Usa Google Authenticator o similar para generar tu código.',
            activo: false,
        },
    ];

    dispositivos: Dispositivo[] = [
        {
            id: 1,
            nombre: 'Chrome — Windows 11',
            sistema: 'Computador',
            ubicacion: 'Yopal, Casanare',
            ultimoAcceso: 'Ahora mismo',
            actual: true,
        },
        {
            id: 2,
            nombre: 'XchanGo App — Android',
            sistema: 'Celular',
            ubicacion: 'Yopal, Casanare',
            ultimoAcceso: 'Hace 2 días',
            actual: false,
        },
        {
            id: 3,
            nombre: 'Edge — Windows 10',
            sistema: 'Computador',
            ubicacion: 'Aguazul, Casanare',
            ultimoAcceso: 'Hace 3 semanas',
            actual: false,
        },
    ];

    alertas: OpcionToggle[] = [
        {
            id: 'inicio-nuevo',
            titulo: 'Inicio de sesión desde un dispositivo nuevo',
            descripcion: 'Te avisamos apenas alguien entre desde un equipo desconocido.',
            activo: true,
        },
        {
            id: 'cambio-datos',
            titulo: 'Cambios en tus datos',
            descripcion: 'Notificación cuando cambie tu correo o contraseña.',
            activo: true,
        },
        {
            id: 'intercambios',
            titulo: 'Actividad sospechosa en intercambios',
            descripcion: 'Alerta si detectamos movimientos raros en tus publicaciones.',
            activo: false,
        },
    ];

    alternarSeccion(seccion: Exclude<SeccionSeguridad, null>): void {
        this.seccionAbierta = this.seccionAbierta === seccion ? null : seccion;
        this.mensaje = '';
    }

    alternarOpcion(opcion: OpcionToggle): void {
        opcion.activo = !opcion.activo;
        this.mensaje = `${opcion.titulo}: ${opcion.activo ? 'activado' : 'desactivado'}`;
        // TODO: llamar al servicio -> this.seguridadService.actualizar(opcion.id, opcion.activo)
    }

    cerrarSesion(dispositivo: Dispositivo): void {
        if (dispositivo.actual) return;
        this.dispositivos = this.dispositivos.filter((d) => d.id !== dispositivo.id);
        this.mensaje = `Cerraste la sesión en ${dispositivo.nombre}.`;
        // TODO: this.seguridadService.cerrarSesion(dispositivo.id)
    }

    cerrarTodas(): void {
        this.dispositivos = this.dispositivos.filter((d) => d.actual);
        this.mensaje = 'Cerraste la sesión en todos los demás dispositivos.';
    }

    trackPorId = (_: number, item: { id: string | number }) => item.id;
}