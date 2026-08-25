import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Paso de verificación por correo, reutilizado en /acceso y /formulario.
// Es una simulación: en este proyecto no hay backend de correo, así que
// cualquier código no vacío se acepta. El código "0000" queda como pista
// visible para quien pruebe la app.
@Component({
  selector: 'app-verificar-codigo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './verificar-codigo.html',
  styleUrl: './verificar-codigo.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerificarCodigoComponent {
  // Correo al que "llegó" el código, solo para mostrarlo en el texto.
  @Input() correo = '';

  @Output() verificado = new EventEmitter<void>();
  @Output() volver = new EventEmitter<void>();

  readonly codigo = signal('');
  readonly error = signal('');
  readonly enviando = signal(false);

  onCodigoChange(valor: string): void {
    this.codigo.set(valor);
    if (this.error()) this.error.set('');
  }

  confirmar(): void {
    const valor = this.codigo().trim();

    if (!valor) {
      this.error.set('Ingresa el código que te enviamos.');
      return;
    }

    // Simulación: no se valida contra nada real, cualquier código sirve.
    this.enviando.set(true);
    setTimeout(() => {
      this.enviando.set(false);
      this.verificado.emit();
    }, 350);
  }

  volverAtras(): void {
    this.volver.emit();
  }
}
