import { Component, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-privacidad',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './privacidad.html',
    styleUrl: './privacidad.css'
})
export class PrivacidadComponent {

    panelAbierto = signal<string | null>(null);

    /* --- Visibilidad del perfil --- */
    opcionesVisibilidad = [
        { id: 'todos', titulo: 'Cualquier persona', detalle: 'Tu perfil aparece en búsquedas públicas.' },
        { id: 'registrados', titulo: 'Solo usuarios de XchanGo', detalle: 'Únicamente quienes tengan cuenta pueden verte.' },
        { id: 'contactos', titulo: 'Solo con quienes he truequeado', detalle: 'La opción más privada.' }
    ];

    visibilidad = signal<string>('registrados');

    /* --- Datos de contacto --- */
    contacto = signal([
        { id: 'telefono', icono: 'phone', titulo: 'Mostrar mi número de teléfono', detalle: 'Visible solo al confirmar un trueque.', activo: false },
        { id: 'correo', icono: 'mail', titulo: 'Mostrar mi correo electrónico', detalle: 'Otros usuarios podrán escribirte por fuera.', activo: false },
        { id: 'ubicacion', icono: 'place', titulo: 'Mostrar mi municipio', detalle: 'Yopal, Casanare.', activo: true }
    ]);

    /* --- Usuarios bloqueados --- */
    bloqueados = signal([
        { id: 1, nombre: 'Andrés Rojas', usuario: '@andresr', fecha: 'Bloqueado el 12 de julio' },
        { id: 2, nombre: 'Laura Mendoza', usuario: '@lau.mendoza', fecha: 'Bloqueado el 3 de agosto' }
    ]);

    /* --- Actividad y datos --- */
    actividad = signal([
        { id: 'historial', titulo: 'Historial de trueques público', detalle: 'Muestra en tu perfil los intercambios que completaste.', activo: true },
        { id: 'sugerencias', titulo: 'Sugerencias personalizadas', detalle: 'Usamos tu actividad para recomendarte trueques.', activo: true },
        { id: 'buscadores', titulo: 'Aparecer en buscadores externos', detalle: 'Permite que Google indexe tu perfil público.', activo: false }
    ]);

    constructor(private location: Location) { }

    togglePanel(id: string): void {
        this.panelAbierto.update(actual => (actual === id ? null : id));
    }

    seleccionarVisibilidad(id: string): void {
        this.visibilidad.set(id);
    }

    toggleContacto(id: string): void {
        this.contacto.update(lista =>
            lista.map(c => (c.id === id ? { ...c, activo: !c.activo } : c))
        );
    }

    toggleActividad(id: string): void {
        this.actividad.update(lista =>
            lista.map(a => (a.id === id ? { ...a, activo: !a.activo } : a))
        );
    }

    desbloquear(id: number): void {
        this.bloqueados.update(lista => lista.filter(b => b.id !== id));
    }

    volver(): void {
        this.location.back();
    }
}