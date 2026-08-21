import { Component, computed, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Publicacion {
    id: number;
    titulo: string;
    categoria: string;
    municipio: string;
    fecha: string;
    imagen: string;
    estado: 'activa' | 'pausada' | 'finalizada';
    vistas: number;
    propuestas: number;
}

@Component({
    selector: 'app-mis-publicaciones',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './mis_publicaciones.html',
    styleUrl: './mis_publicaciones.css'
})
export class MisPublicacionesComponent {

    filtro = signal<'todas' | 'activa' | 'pausada' | 'finalizada'>('todas');

    filtros = [
        { id: 'todas', etiqueta: 'Todas' },
        { id: 'activa', etiqueta: 'Activas' },
        { id: 'pausada', etiqueta: 'Pausadas' },
        { id: 'finalizada', etiqueta: 'Finalizadas' }
    ] as const;

    publicaciones = signal<Publicacion[]>([
        {
            id: 1,
            titulo: 'Nissan GT-R 3.8 Premium Edition',
            categoria: 'Vehiculos',
            municipio: 'Yopal',
            fecha: '12 de agosto',
            imagen:'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=450&fit=crop&q=80',
            estado: 'activa',
            vistas: 128,
            propuestas: 4
        },
        {
            id: 2,
            titulo: 'iPhone 13 \\ 128GB',
            categoria: 'Electronicos',
            municipio: 'Yopal',
            fecha: '5 de agosto',
            imagen: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=600&h=450&fit=crop&q=80',
            estado: 'activa',
            vistas: 96,
            propuestas: 2
        },
        {
            id: 3,
            titulo: 'MacBook Pro 14"',
            categoria: 'Electronicos',
            municipio: 'Aguazul',
            fecha: '28 de julio',
            imagen: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=450&fit=crop&q=80',
            estado: 'pausada',
            vistas: 210,
            propuestas: 7
        },
        {
            id: 4,
            titulo: 'Bicicleta de montaña',
            categoria: 'Bien fisico',
            municipio: 'Yopal',
            fecha: '14 de julio',
            imagen: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&h=450&fit=crop&q=80',
            estado: 'finalizada',
            vistas: 340,
            propuestas: 11
        }
    ]);

    publicacionesFiltradas = computed(() => {
        const f = this.filtro();
        return f === 'todas'
            ? this.publicaciones()
            : this.publicaciones().filter(p => p.estado === f);
    });

    totalActivas = computed(() => this.publicaciones().filter(p => p.estado === 'activa').length);
    totalPropuestas = computed(() => this.publicaciones().reduce((suma, p) => suma + p.propuestas, 0));
    totalVistas = computed(() => this.publicaciones().reduce((suma, p) => suma + p.vistas, 0));

    constructor(private location: Location) { }

    cambiarFiltro(id: 'todas' | 'activa' | 'pausada' | 'finalizada'): void {
        this.filtro.set(id);
    }

    contarPor(estado: string): number {
        return estado === 'todas'
            ? this.publicaciones().length
            : this.publicaciones().filter(p => p.estado === estado).length;
    }

    etiquetaEstado(estado: string): string {
        const mapa: Record<string, string> = {
            activa: 'Activa',
            pausada: 'Pausada',
            finalizada: 'Finalizada'
        };
        return mapa[estado] ?? estado;
    }

    alternarPausa(id: number): void {
        this.publicaciones.update(lista =>
            lista.map(p => {
                if (p.id !== id || p.estado === 'finalizada') return p;
                return { ...p, estado: p.estado === 'activa' ? 'pausada' : 'activa' };
            })
        );
    }

    eliminar(id: number): void {
        this.publicaciones.update(lista => lista.filter(p => p.id !== id));
    }

    volver(): void {
        this.location.back();
    }
}