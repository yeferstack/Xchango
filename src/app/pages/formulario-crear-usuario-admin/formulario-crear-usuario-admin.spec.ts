import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioCrearUsuarioAdminComponent } from './formulario-crear-usuario-admin';

describe('FormularioCrearUsuarioAdminComponent', () => {
  let component: FormularioCrearUsuarioAdminComponent;
  let fixture: ComponentFixture<FormularioCrearUsuarioAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioCrearUsuarioAdminComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioCrearUsuarioAdminComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});