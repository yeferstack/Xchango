import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Formulario_crear_usuarioComponent } from './formulario_crear_usuario';

describe('Formulario_crear_usuarioComponent', () => {
  let component: Formulario_crear_usuarioComponent;
  let fixture: ComponentFixture<Formulario_crear_usuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Formulario_crear_usuarioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Formulario_crear_usuarioComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});