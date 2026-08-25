import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export type TamanoLogo = 'sm' | 'md' | 'lg';

/*
  El logo son dos imágenes: el chango y las letras.
  Estaba copiado en el login, en el header, en acceso y en el modal,
  cada uno con tamaños distintos. Ahora todos usan este componente.

  <app-logo-xchango></app-logo-xchango>
  <app-logo-xchango tamano="lg" enlace="/home"></app-logo-xchango>
*/
@Component({
  selector: 'app-logo-xchango',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './logo-xchango.html',
  styleUrl: './logo-xchango.css',
})
export class LogoXchangoComponent {
  @Input() tamano: TamanoLogo = 'md';

  // ruta a la que lleva el logo. Si va vacía no es un enlace.
  @Input() enlace = '';

  // solo el chango, para espacios angostos
  @Input() soloChango = false;

  // usa logo.png, que ya trae el chango con las letras debajo.
  // Es el que va dentro de las ventanas de entrar y crear cuenta.
  @Input() apilado = false;
}
