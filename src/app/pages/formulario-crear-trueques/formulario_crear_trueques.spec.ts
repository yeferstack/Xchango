import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Formulario_crear_trueques } from './formulario_crear_trueques';

describe('Formulario_crear_trueques', () => {
  let component: Formulario_crear_trueques;
  let fixture: ComponentFixture<Formulario_crear_trueques>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Formulario_crear_trueques],
    }).compileComponents();

    fixture = TestBed.createComponent(Formulario_crear_trueques);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
