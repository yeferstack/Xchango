import { Component, OnInit, inject } from '@angular/core';
import { IconoComponent } from '../../components/icono/icono';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TruequesService } from '../../services/trueques';

@Component({
    selector: 'app-informacion',
    standalone: true,
    imports: [IconoComponent, CommonModule, FormsModule, RouterLink],
    templateUrl: './informacion.html',
    styleUrl: './informacion.css'
})
export class InformacionComponent implements OnInit {
    private servicio = inject(TruequesService);

    calificacionMaxima: number = 5;
    totalCalificacionesRequeridas: number = 5;

    // Campos editables del formulario
    nombreElegido: string = '';
    numeroTelefono: string = '';

    // Foto nueva seleccionada (preview antes de guardar)
    fotoPreviewUrl: string | null = null;
    private archivoSeleccionado: File | null = null;

    guardado = false;

    ngOnInit(): void {
        this.servicio.cargar();
        const usuario = this.servicio.usuarioActual();
        this.nombreElegido = usuario?.nombre ?? '';
        this.numeroTelefono = usuario?.telefono ?? '';
    }

    // Datos generales del perfil (mismo header lateral que en /perfil).
    get nombreUsuario(): string {
        return this.servicio.usuarioActual()?.nombre ?? 'Invitado';
    }

    get avatarUrl(): string {
        return this.fotoPreviewUrl ?? this.servicio.usuarioActual()?.avatar ?? 'Logo-xchango/chango.png';
    }

    get calificacion(): number {
        return this.servicio.usuarioActual()?.calificacion ?? 0;
    }

    get notificaciones(): number {
        return this.servicio.notificacionesSinLeer();
    }

    estrellas(): boolean[] {
        return Array.from(
            { length: this.calificacionMaxima },
            (_, i) => i < Math.round(this.calificacion)
        );
    }

    onArchivoSeleccionado(event: Event): void {
        const input = event.target as HTMLInputElement;
        const archivo = input.files?.[0];
        if (!archivo) {
            return;
        }

        this.archivoSeleccionado = archivo;

        const lector = new FileReader();
        lector.onload = () => {
            this.fotoPreviewUrl = lector.result as string;
        };
        lector.readAsDataURL(archivo);
    }

    guardarCambios(): void {
        this.servicio.actualizarPerfil({
            nombre: this.nombreElegido.trim(),
            telefono: this.numeroTelefono.trim(),
            ...(this.fotoPreviewUrl ? { avatar: this.fotoPreviewUrl } : {}),
        });

        this.guardado = true;
        setTimeout(() => (this.guardado = false), 2500);
    }
}
