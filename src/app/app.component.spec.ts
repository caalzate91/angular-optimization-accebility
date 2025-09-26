import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
<<<<<<< HEAD

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [AppComponent]
  }));
=======
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      // Importante: permite que el test ignore el componente <app-character-list>
      schemas: [CUSTOM_ELEMENTS_SCHEMA] 
    }).compileComponents();
  });
>>>>>>> 5f8f2c6 (Reto tecnico angular: Andres Julian Camacho Monsocua)

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

<<<<<<< HEAD
  it(`should have as title 'angular-sofkau'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-sofkau');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('angular-sofkau app is running!');
  });
});
=======
  it(`should have the title 'angular-sofkau'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    // Asume que el título del componente TypeScript es 'angular-sofkau'
    expect(app.title).toEqual('angular-sofkau');
  });

  // PRUEBA CORREGIDA: Verifica un elemento que SÍ existe en el HTML actual.
  it('should render the Rick and Morty banner image', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Buscamos la imagen del encabezado
    const bannerImage = compiled.querySelector('.banner-image');
    
    // Verificamos que el elemento exista
    expect(bannerImage).toBeTruthy(); 
    
    // Verificamos que el atributo alt sea el esperado
    expect(bannerImage!.getAttribute('alt')).toContain('Rick and Morty Banner');
  });
});
>>>>>>> 5f8f2c6 (Reto tecnico angular: Andres Julian Camacho Monsocua)
