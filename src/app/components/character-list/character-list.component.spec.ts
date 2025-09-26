import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs'; 
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CharacterListComponent } from './character-list.component';
import { RickMortyService, ApiResponse } from '../../services/rick-morty.service';

const API_URL = 'https://rickandmortyapi.com/api/character';

const MOCK_API_RESPONSE: ApiResponse = {
  info: { count: 826, pages: 5, next: 'next_url', prev: null },
  results: [
    { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human', type: '', gender: 'Male', origin: { name: 'Earth', url: '' }, location: { name: 'Citadel', url: '' }, image: 'url/rick.png', episode: [], url: '', created: '' },
    { id: 2, name: 'Morty Smith', status: 'Alive', species: 'Human', type: '', gender: 'Male', origin: { name: 'Earth', url: '' }, location: { name: 'Citadel', url: '' }, image: 'url/morty.png', episode: [], url: '', created: '' }
  ],
};

const mockRickMortyServiceAislado = {
  getCharacters: jest.fn(() => of(MOCK_API_RESPONSE)), 
};

describe('CharacterListComponent', () => {
    
    describe('Pruebas Unitarias y de Interacción (Aislado)', () => {
        let component: CharacterListComponent;
        let fixture: ComponentFixture<CharacterListComponent>;
        let service: RickMortyService;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                declarations: [CharacterListComponent],
                providers: [
                    { provide: RickMortyService, useValue: mockRickMortyServiceAislado }
                ],
                schemas: [NO_ERRORS_SCHEMA] 
            }).compileComponents();
        });

        beforeEach(() => {
            mockRickMortyServiceAislado.getCharacters.mockClear(); 
            mockRickMortyServiceAislado.getCharacters.mockReturnValue(of(MOCK_API_RESPONSE));
            
            fixture = TestBed.createComponent(CharacterListComponent);
            component = fixture.componentInstance;
            service = TestBed.inject(RickMortyService);

            fixture.detectChanges(); 
        });

        it('debería crearse correctamente y cargar personajes en OnInit', () => {
            expect(component).toBeTruthy();
            expect(mockRickMortyServiceAislado.getCharacters).toHaveBeenCalledWith(1);
            expect(component.characters.length).toBe(2);
        });

        it('debería avanzar a la página siguiente al hacer clic en el botón "Next →" y llamar al servicio', () => {
            const nextButton: HTMLButtonElement = fixture.nativeElement.querySelector('.next-btn'); 
            nextButton.click(); 
            fixture.detectChanges();

            expect(mockRickMortyServiceAislado.getCharacters).toHaveBeenCalledWith(2); 
            expect(component.currentPage).toBe(2);
        });

        it('debería deshabilitar el botón "Previous" en la página 1', () => {
            const prevButton: HTMLButtonElement = fixture.nativeElement.querySelector('.prev-btn');
            expect(component.currentPage).toBe(1);
            expect(prevButton.disabled).toBe(true); 
        });

        it('debería mostrar el mensaje de error si la carga falla', () => {
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

            const mockError = new Error('API down');
            
            mockRickMortyServiceAislado.getCharacters.mockReturnValue(throwError(() => mockError));
            
            component.loadCharacters(1);
            fixture.detectChanges();
            
            expect(component.error).toBe('Error loading characters. Please try again.');
            
            consoleErrorSpy.mockRestore();
        });
    });

    describe('Integración Ligera: Componente + Servicio Real + HTTP Mock', () => {
        let component: CharacterListComponent;
        let fixture: ComponentFixture<CharacterListComponent>;
        let httpTestingController: HttpTestingController; 

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                declarations: [CharacterListComponent],
                imports: [HttpClientTestingModule], 
                providers: [RickMortyService], 
                schemas: [NO_ERRORS_SCHEMA] 
            }).compileComponents();
        });

        beforeEach(() => {
            fixture = TestBed.createComponent(CharacterListComponent);
            component = fixture.componentInstance;
            httpTestingController = TestBed.inject(HttpTestingController);
        });

        afterEach(() => {
            httpTestingController.verify();
        });

        it('debería cargar y mostrar personajes al inicializarse (ngOnInit) usando el flujo completo', () => {
            fixture.detectChanges(); 
            
            const req = httpTestingController.expectOne(`${API_URL}?page=1`);
            expect(req.request.method).toEqual('GET'); 

            req.flush(MOCK_API_RESPONSE);

            fixture.detectChanges();

            expect(component.loading).toBe(false);
            expect(component.characters.length).toBe(2);
            
            const firstCharacterNameElement: HTMLElement = fixture.nativeElement.querySelector('.character-name');
            expect(firstCharacterNameElement).toBeTruthy(); 
            expect(firstCharacterNameElement.textContent).toContain('Rick Sanchez'); 
        });

        it('debería mostrar el estado de error cuando el servidor responde con un fallo', () => {
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

            fixture.detectChanges();
            
            const req = httpTestingController.expectOne(`${API_URL}?page=1`);
            
            req.flush('Simulated Server Error', { status: 500, statusText: 'Server Error' });

            fixture.detectChanges();

            expect(component.loading).toBe(false);
            expect(component.error).toBe('Error loading characters. Please try again.'); 
            expect(component.characters.length).toBe(0);
            
            consoleErrorSpy.mockRestore();
        });
    });
});