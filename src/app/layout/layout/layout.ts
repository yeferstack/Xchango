import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
 
/**
 * Layout general de la app. Por ahora solo envuelve el router-outlet,
 * para que cuando agregues más páginas (Explorar, Mis trueques, etc.)
 * todas compartan la misma estructura general si lo necesitas.
 *
 * El <app-header> de "home" se mantiene dentro de HomeComponent por ahora,
 * porque guarda estado propio de esa página (búsqueda, favoritos). Si más
 * adelante quieres un header persistente en TODAS las páginas, avísame y
 * lo movemos aquí usando un servicio compartido para el estado.
 */
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class LayoutComponent {}