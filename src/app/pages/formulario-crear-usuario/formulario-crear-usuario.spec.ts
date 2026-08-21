import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioCrearUsuarioComponent } from './formulario-crear-usuario';

describe('FormularioCrearUsuarioComponent', () => {
  let component: FormularioCrearUsuarioComponent;
  let fixture: ComponentFixture<FormularioCrearUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioCrearUsuarioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioCrearUsuarioComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});