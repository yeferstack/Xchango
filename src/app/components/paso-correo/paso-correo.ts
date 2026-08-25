import { Component, EventEmitter, Input, OnInit, Output, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthPinService } from '../../services/auth-pin';

/*
  Primera pantalla de entrar y de crear cuenta: solo el correo.
  Manda el PIN y avisa al padre para que pase al siguiente paso.
*/
@Component({
  selector: 'app-paso-correo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './paso-correo.html',
  styleUrl: './paso-correo.css',
})
export class PasoCorreoComponent implements OnInit {
  @Input() correoInicial = '';
  @Input() textoBoton = 'Continuar';

  @Output() enviado = new EventEmitter<string>();

  private auth = inject(AuthPinService);

  readonly error = signal('');
  readonly enviando = signal(false);

  correo = '';

  ngOnInit(): void {
    this.correo = this.correoInicial;
  }

  onCorreoChange(): void {
    if (this.error()) {
      this.error.set('');
    }
  }

  continuar(): void {
    const limpio = this.correo.trim().toLowerCase();

    if (!limpio) {
      this.error.set('Escribe tu correo.');
      return;
    }

    if (!this.auth.esCorreoValido(limpio)) {
      this.error.set('Ese correo no tiene un formato válido.');
      return;
    }

    this.enviando.set(true);

    const problema = this.auth.enviarPin(limpio);
    this.enviando.set(false);

    if (problema) {
      this.error.set(problema);
      return;
    }

    this.enviado.emit(limpio);
  }
}
