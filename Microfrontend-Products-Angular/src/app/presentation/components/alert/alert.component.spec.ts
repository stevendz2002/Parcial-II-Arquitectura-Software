import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
  });

  it('debería crearse correctamente', () => {
    component.alertState = 'loading';
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('debería generar la clase CSS correcta para alertState loading', () => {
    component.alertState = 'loading';
    expect(component.getClass()).toBe('alert alert-primary d-flex align-items-center');
  });

  it('debería generar la clase CSS correcta para alertState error', () => {
    component.alertState = 'error';
    expect(component.getClass()).toBe('alert alert-danger d-flex align-items-center');
  });

  it('debería renderizar el texto provisto', () => {
    component.alertState = 'loading';
    component.text = 'Cargando datos...';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Cargando datos...');
  });
});
