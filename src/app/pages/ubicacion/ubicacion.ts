import { Component, signal } from '@angular/core';
import { IconoComponent } from '../../components/icono/icono';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MUNICIPIOS_CASANARE } from '../../shared/municipios-casanare';

@Component({
    selector: 'app-ubicacion',
    standalone: true,
    imports: [IconoComponent, CommonModule, FormsModule, RouterLink],
    templateUrl: './ubicacion.html',
    styleUrl: './ubicacion.css'
})
export class UbicacionComponent {

    // unicipios de casanare

    municipios: readonly string[] = MUNICIPIOS_CASANARE;


    // bicación guardada

    municipio = signal('Yopal');
    barrio = signal('El Triunfo');
    referencia = signal('Cerca al parque principal');


    // dición

    editando = signal(false);

    tempMunicipio = signal('');
    tempBarrio = signal('');
    tempReferencia = signal('');


    // adio de búsqueda

    radio = signal(15);


    ubicacionActual = signal(false);
    obteniendoUbicacion = signal(false);

    latitud = signal<number | null>(null);
    longitud = signal<number | null>(null);


    truequesCercanos = signal([
        {
            id: 1,
            titulo: 'Bicicleta MTB',
            categoria: 'Deportes',
            distancia: 2.4,
            x: 24,
            y: 36
        },
        {
            id: 2,
            titulo: 'Control para PS5',
            categoria: 'Videojuegos',
            distancia: 4.8,
            x: 63,
            y: 28
        },
        {
            id: 3,
            titulo: 'Escritorio de madera',
            categoria: 'Hogar',
            distancia: 7.2,
            x: 47,
            y: 67
        },
        {
            id: 4,
            titulo: 'Audífonos Bluetooth',
            categoria: 'Tecnología',
            distancia: 10.5,
            x: 76,
            y: 72
        }
    ]);


    // puntos de encuentro

    puntos = signal([
        {
            id: 1,
            nombre: 'Parque El Resurgimiento',
            detalle: 'Yopal · Zona centro'
        },
        {
            id: 2,
            nombre: 'Centro Comercial Unicentro',
            detalle: 'Yopal · Carrera 30'
        }
    ]);

    nuevoPunto = signal('');


    preferencias = signal([
        {
            id: 'aproximada',
            titulo: 'Mostrar ubicación aproximada',
            detalle: 'Los demás verán solo el municipio, no tu dirección.',
            activo: true
        },
        {
            id: 'cercanos',
            titulo: 'Priorizar trueques cercanos',
            detalle: 'Ordena los resultados según la distancia a tu ubicación.',
            activo: true
        },
        {
            id: 'gps',
            titulo: 'Usar mi ubicación actual',
            detalle: 'Permite que XchanGo detecte tu posición desde el navegador.',
            activo: false
        }
    ]);


    guardado = signal(false);


    // Trueque del marcador que se tocó en el mapa. null = ninguno.
    truequeSeleccionado: { titulo: string; distancia: number } | null = null;

    constructor(private location: Location) { }

    // Al tocar un marcador se muestra de qué publicación es.
    verMarcador(trueque: { titulo: string; distancia: number }): void {
        this.truequeSeleccionado =
            this.truequeSeleccionado?.titulo === trueque.titulo ? null : trueque;
    }


    // edición de ubicación

    iniciarEdicion(): void {
        this.tempMunicipio.set(this.municipio());
        this.tempBarrio.set(this.barrio());
        this.tempReferencia.set(this.referencia());
        this.editando.set(true);
    }


    cancelarEdicion(): void {
        this.editando.set(false);
    }


    guardarUbicacion(): void {

        if (!this.tempMunicipio()) {
            return;
        }

        this.municipio.set(this.tempMunicipio());
        this.barrio.set(this.tempBarrio().trim());
        this.referencia.set(this.tempReferencia().trim());

        this.editando.set(false);
    }


    cambiarRadio(valor: string): void {
        this.radio.set(Number(valor));
    }


    // gps

    usarUbicacionActual(): void {

        if (!navigator.geolocation) {
            alert('Tu navegador no permite obtener la ubicación actual.');
            return;
        }

        this.obteniendoUbicacion.set(true);

        navigator.geolocation.getCurrentPosition(
            (position) => {

                this.latitud.set(position.coords.latitude);
                this.longitud.set(position.coords.longitude);

                this.ubicacionActual.set(true);
                this.obteniendoUbicacion.set(false);

                this.preferencias.update(lista =>
                    lista.map(p =>
                        p.id === 'gps'
                            ? { ...p, activo: true }
                            : p
                    )
                );
            },

            () => {
                this.obteniendoUbicacion.set(false);

                alert(
                    'No fue posible obtener tu ubicación. ' +
                    'Verifica los permisos de ubicación del navegador.'
                );
            }
        );
    }


    // puntos de encuentro

    agregarPunto(): void {

        const nombre = this.nuevoPunto().trim();

        if (!nombre) {
            return;
        }

        const nuevoId = this.puntos().length > 0
            ? Math.max(...this.puntos().map(p => p.id)) + 1
            : 1;

        this.puntos.update(lista => [
            ...lista,
            {
                id: nuevoId,
                nombre,
                detalle: `${this.municipio()} · Punto personalizado`
            }
        ]);

        this.nuevoPunto.set('');
    }


    eliminarPunto(id: number): void {

        this.puntos.update(lista =>
            lista.filter(p => p.id !== id)
        );
    }


    // preferencias

    togglePreferencia(id: string): void {

        this.preferencias.update(lista =>
            lista.map(p =>
                p.id === id
                    ? { ...p, activo: !p.activo }
                    : p
            )
        );

        if (id === 'gps') {

            const gpsActivo = this.preferencias()
                .find(p => p.id === 'gps')?.activo;

            if (gpsActivo && !this.ubicacionActual()) {
                this.usarUbicacionActual();
            }
        }
    }


    abrirGoogleMaps(nombre: string): void {

        const destino =
            `${nombre}, ${this.municipio()}, Casanare, Colombia`;

        const url =
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destino)}`;

        window.open(url, '_blank', 'noopener,noreferrer');
    }


    guardarCambios(): void {

        this.guardado.set(true);

        setTimeout(() => {
            this.guardado.set(false);
        }, 2500);
    }


    volver(): void {
        this.location.back();
    }
}