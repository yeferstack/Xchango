import { Injectable, computed, signal } from '@angular/core';

const CLAVE_PIN = 'xchango_pin';
const CLAVE_VERIFICADO = 'xchango_correo_verificado';

// el PIN vence a los 10 minutos
const MINUTOS_VIGENCIA = 10;

// segundos que hay que esperar para pedir otro
const ESPERA_REENVIO = 30;

const MAX_INTENTOS = 5;

interface PinGuardado {
  correo: string;
  pin: string;
  vence: number;
  intentos: number;
}

/*
  Autenticación por correo y PIN. XchanGo no usa contraseña: se pide el
  correo, se manda un PIN de 6 dígitos y con eso se entra o se sigue al
  formulario de registro.

  Acá no hay backend de correo, así que el PIN se genera en el navegador
  y se muestra en pantalla para poder probar. Cuando exista la API, lo
  único que cambia es enviarPin() y verificarPin(), el resto queda igual.
*/
@Injectable({ providedIn: 'root' })
export class AuthPinService {
  // el PIN generado, para mostrarlo mientras no haya correo de verdad
  readonly pinDemo = signal('');

  readonly segundosParaReenviar = signal(0);

  readonly puedeReenviar = computed(() => this.segundosParaReenviar() === 0);

  private cuentaRegresiva?: ReturnType<typeof setInterval>;

  esCorreoValido(correo: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim());
  }

  // devuelve null si salió bien, o el mensaje de error
  enviarPin(correo: string): string | null {
    const limpio = correo.trim().toLowerCase();

    if (!this.esCorreoValido(limpio)) {
      return 'Escribe un correo válido.';
    }

    if (!this.puedeReenviar()) {
      return `Espera ${this.segundosParaReenviar()} segundos para pedir otro PIN.`;
    }

    const pin = this.generarPin();

    const datos: PinGuardado = {
      correo: limpio,
      pin,
      vence: Date.now() + MINUTOS_VIGENCIA * 60 * 1000,
      intentos: 0,
    };

    this.guardar(CLAVE_PIN, datos);
    this.pinDemo.set(pin);
    this.arrancarEspera();

    return null;
  }

  // devuelve null si el PIN estaba bien, o el mensaje de error
  verificarPin(correo: string, pin: string): string | null {
    const datos = this.leerPin();
    const limpio = correo.trim().toLowerCase();
    const escrito = pin.trim();

    if (!datos || datos.correo !== limpio) {
      return 'No encontramos un PIN para ese correo. Pídelo de nuevo.';
    }

    if (Date.now() > datos.vence) {
      this.olvidarPin();
      return 'El PIN se venció. Pide uno nuevo.';
    }

    if (datos.intentos >= MAX_INTENTOS) {
      this.olvidarPin();
      return 'Demasiados intentos. Pide un PIN nuevo.';
    }

    if (escrito !== datos.pin) {
      datos.intentos++;
      this.guardar(CLAVE_PIN, datos);
      const quedan = MAX_INTENTOS - datos.intentos;
      return `El PIN no coincide. Te quedan ${quedan} intentos.`;
    }

    this.olvidarPin();
    this.marcarVerificado(limpio);
    return null;
  }

  // correo que acaba de pasar la verificación, o cadena vacía
  correoVerificado(): string {
    try {
      return localStorage.getItem(CLAVE_VERIFICADO) ?? '';
    } catch {
      return '';
    }
  }

  hayCorreoVerificado(): boolean {
    return this.correoVerificado() !== '';
  }

  limpiarVerificacion(): void {
    try {
      localStorage.removeItem(CLAVE_VERIFICADO);
    } catch {
      // si el navegador no deja guardar, no pasa nada
    }
  }

  private marcarVerificado(correo: string): void {
    try {
      localStorage.setItem(CLAVE_VERIFICADO, correo);
    } catch {
      // igual que arriba
    }
  }

  private generarPin(): string {
    let pin = '';
    for (let i = 0; i < 6; i++) {
      pin += Math.floor(Math.random() * 10);
    }
    return pin;
  }

  private arrancarEspera(): void {
    clearInterval(this.cuentaRegresiva);
    this.segundosParaReenviar.set(ESPERA_REENVIO);

    this.cuentaRegresiva = setInterval(() => {
      const quedan = this.segundosParaReenviar() - 1;
      this.segundosParaReenviar.set(quedan);

      if (quedan <= 0) {
        clearInterval(this.cuentaRegresiva);
      }
    }, 1000);
  }

  private leerPin(): PinGuardado | null {
    try {
      const texto = localStorage.getItem(CLAVE_PIN);
      return texto ? (JSON.parse(texto) as PinGuardado) : null;
    } catch {
      return null;
    }
  }

  private olvidarPin(): void {
    try {
      localStorage.removeItem(CLAVE_PIN);
    } catch {
      // sin localStorage el PIN simplemente no sobrevive a un F5
    }
    this.pinDemo.set('');
  }

  private guardar(clave: string, datos: PinGuardado): void {
    try {
      localStorage.setItem(clave, JSON.stringify(datos));
    } catch {
      // sin localStorage el PIN simplemente no sobrevive a un F5
    }
  }
}
