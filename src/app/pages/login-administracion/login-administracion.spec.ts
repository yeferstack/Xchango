import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAdministracion } from './login-administracion';

describe('LoginAdministracion', () => {
  let component: LoginAdministracion;
  let fixture: ComponentFixture<LoginAdministracion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginAdministracion],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginAdministracion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
