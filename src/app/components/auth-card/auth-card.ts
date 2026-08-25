import { Component, Input } from '@angular/core';
import { LogoXchangoComponent } from '../logo-xchango/logo-xchango';

/*
  La tarjeta blanca sobre el fondo del login.
  La usan entrar y crear cuenta, así las dos se ven como la misma
  pantalla y solo cambia lo de adentro.

  El fondo lo pone la clase xg-auth del body y la maneja cada página,
  no este componente: al pasar de un paso a otro la tarjeta se destruye
  y borraría el fondo a mitad de camino.
*/
@Component({
  selector: 'app-auth-card',
  standalone: true,
  imports: [LogoXchangoComponent],
  templateUrl: './auth-card.html',
  styleUrl: './auth-card.css',
})
export class AuthCardComponent {
  @Input() titulo = '';
  @Input() subtitulo = '';
}
