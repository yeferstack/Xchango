import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-seguridad',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './seguridad.html',
    styleUrl: './seguridad.css'
})
export class SeguridadComponent {

    // Acordeón abierto (null = todos cerrados)
    panelAbierto = signal<string | null>(null);

    // Métodos de verificación
    metodos = signal([
        { id: 'correo', icono: 'mail', titulo: 'Verificación por correo', detalle: 'miguel.perez@gmail.com', activo: true },
        { id: 'sms', icono: 'sms', titulo: 'Verificación por SMS', detalle: 'Recibe un código en tu celular', activo: false },
        { id: 'app', icono: 'phonelink_lock', titulo: 'Aplicación de autenticación', detalle: 'Google Authenticator o similar', activo: false }
    ]);

    // Dispositivos vinculados
    dispositivos = signal([
        { id: 1, icono: 'laptop_windows', nombre: 'Windows · Chrome', lugar: 'Yopal, Casanare', fecha: 'Sesión actual', actual: true },
        { id: 2, icono: 'smartphone', nombre: 'Android · XchanGo App', lugar: 'Yopal, Casanare', fecha: 'Hace 2 días', actual: false },
        { id: 3, icono: 'tablet_mac', nombre: 'iPad · Safari', lugar: 'Villavicencio, Meta', fecha: 'Hace 3 semanas', actual: false }
    ]);

    // Alertas de seguridad
    alertas = signal([
        { id: 'inicio', titulo: 'Inicios de sesión nuevos', detalle: 'Te avisamos cuando entren desde un dispositivo desconocido.', activo: true },
        { id: 'clave', titulo: 'Cambios de contraseña', detalle: 'Notificación cada vez que se actualice tu contraseña.', activo: true },
        { id: 'trueque', titulo: 'Actividad sospechosa en trueques', detalle: 'Avisos sobre intentos de fraude o reportes.', activo: false }
    ]);

    constructor(private location: Location) { }

    togglePanel(id: string): void {
        this.panelAbierto.update(actual => (actual === id ? null : id));
    }

    toggleMetodo(id: string): void {
        this.metodos.update(lista =>
            lista.map(m => (m.id === id ? { ...m, activo: !m.activo } : m))
        );
    }

    toggleAlerta(id: string): void {
        this.alertas.update(lista =>
            lista.map(a => (a.id === id ? { ...a, activo: !a.activo } : a))
        );
    }

    cerrarSesionDispositivo(id: number): void {
        this.dispositivos.update(lista => lista.filter(d => d.id !== id));
    }

    volver(): void {
        this.location.back();
    }
}