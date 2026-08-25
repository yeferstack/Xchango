import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthPinService } from '../../services/auth-pin';

/*
  Pantalla del PIN. La usan igual entrar y crear cuenta, por eso el texto
  del botón entra por @Input: en una dice "Iniciar sesión" y en la otra
  "Verificar PIN", pero es la misma pantalla.
*/
@Component({
  selector: 'app-paso-pin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './paso-pin.html',
  styleUrl: './paso-pin.css',
})
export class PasoPinComponent {
  @Input() correo = '';
  @Input() textoBoton = 'Verificar PIN';

  @Output() verificado = new EventEmitter<string>();
  @Output() volver = new EventEmitter<void>();

  private auth = inject(AuthPinService);

  readonly pinDemo = this.auth.pinDemo;
  readonly segundos = this.auth.segundosParaReenviar;
  readonly puedeReenviar = this.auth.puedeReenviar;

  readonly pin = signal('');
  readonly error = signal('');
  readonly aviso = signal('');
  readonly enviando = signal(false);

  onPinChange(valor: string): void {
    // solo números, máximo 6
    this.pin.set(valor.replace(/\D/g, '').slice(0, 6));
    this.error.set('');
    this.aviso.set('');
  }

  confirmar(): void {
    const valor = this.pin();

    if (valor.length < 6) {
      this.error.set('El PIN tiene 6 dígitos.');
      return;
    }

    this.enviando.set(true);

    // el retraso es para que se note que está revisando
    setTimeout(() => {
      const problema = this.auth.verificarPin(this.correo, valor);
      this.enviando.set(false);

      if (problema) {
        this.error.set(problema);
        this.pin.set('');
        return;
      }

      this.verificado.emit(this.correo);
    }, 300);
  }

  reenviar(): void {
    const problema = this.auth.enviarPin(this.correo);

    if (problema) {
      this.error.set(problema);
      return;
    }

    this.pin.set('');
    this.error.set('');
    this.aviso.set('Te enviamos un PIN nuevo.');
  }

  volverAtras(): void {
    this.volver.emit();
  }
}
