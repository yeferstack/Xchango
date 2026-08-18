import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Formulario_crear_truequesComponent } from './formulario_crear_trueques';

describe('Formulario_crear_trueques', () => {
  let component: Formulario_crear_truequesComponent;
  let fixture: ComponentFixture<Formulario_crear_truequesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Formulario_crear_truequesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Formulario_crear_truequesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
