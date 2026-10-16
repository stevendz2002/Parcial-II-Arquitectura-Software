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

  it('debe crearse correctamente', () => {
    component.alertState = 'loading';
    expect(component).toBeTruthy();
  });

  it('debe retornar clase alert-primary cuando alertState sea loading', () => {
    component.alertState = 'loading';
    expect(component.getClass()).toContain('alert-primary');
  });

  it('debe retornar clase alert-danger cuando alertState sea error', () => {
    component.alertState = 'error';
    expect(component.getClass()).toContain('alert-danger');
  });

  it('debe renderizar el texto especificado en la alerta', () => {
    component.alertState = 'loading';
    component.text = 'Cargando datos...';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Cargando datos...');
  });
});
