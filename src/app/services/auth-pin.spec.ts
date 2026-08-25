import { TestBed } from '@angular/core/testing';
import { AuthPinService } from './auth-pin';

describe('AuthPinService', () => {
  let servicio: AuthPinService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    servicio = TestBed.inject(AuthPinService);
  });

  it('rechaza un correo mal escrito', () => {
    expect(servicio.esCorreoValido('juan@')).toBe(false);
    expect(servicio.esCorreoValido('juan@correo.com')).toBe(true);
  });

  it('no acepta un PIN que no es el que se generó', () => {
    servicio.enviarPin('juan@correo.com');
    const error = servicio.verificarPin('juan@correo.com', '000000');
    expect(error).toBeTruthy();
  });

  it('acepta el PIN correcto y deja el correo verificado', () => {
    servicio.enviarPin('juan@correo.com');
    const pin = servicio.pinDemo();

    expect(servicio.verificarPin('juan@correo.com', pin)).toBeNull();
    expect(servicio.correoVerificado()).toBe('juan@correo.com');
  });
});
