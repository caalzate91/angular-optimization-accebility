import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { RickMortyService, ApiResponse, Character } from './rick-morty.service';

describe('RickMortyService', () => {
  let service: RickMortyService;
  let httpTestingController: HttpTestingController;
  const apiUrl = 'https://rickandmortyapi.com/api/character';

  const MOCK_SINGLE_CHARACTER: Character = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth (C-137)', url: '' },
    location: { name: 'Citadel of Ricks', url: '' },
    image: 'url/rick.png',
    episode: ['url/episode/1'],
    url: 'url/character/1',
    created: '2017-11-10T12:00:00.000Z',
  };

  const MOCK_API_RESPONSE: ApiResponse = {
    info: { count: 826, pages: 42, next: 'next_url', prev: null },
    results: [MOCK_SINGLE_CHARACTER, { ...MOCK_SINGLE_CHARACTER, id: 2, name: 'Morty Smith' }],
  };
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [RickMortyService]
    });

    service = TestBed.inject(RickMortyService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('debería ser creado', () => {
    expect(service).toBeTruthy();
  });

//Test para el metodo de la API getCharacters
  describe('getCharacters', () => {

    it('Caso de Éxito: debe hacer GET a la URL correcta y retornar la lista de personajes', () => {
      const testPage = 5;
      const expectedUrl = `${apiUrl}?page=${testPage}`;
      
      service.getCharacters(testPage).subscribe(response => {
        expect(response).toEqual(MOCK_API_RESPONSE);
        expect(response.results.length).toBe(2);
        expect(response.info.pages).toBe(42);
      });

      const req = httpTestingController.expectOne(expectedUrl);

      expect(req.request.method).toEqual('GET');

      req.flush(MOCK_API_RESPONSE);
    });

    it('Caso de Error: debe manejar y propagar un error 404', () => {
      const errorStatus = 404;
      const errorStatusText = 'Not Found';
      const testUrl = `${apiUrl}?page=999`;

      service.getCharacters(999).subscribe({
        next: () => fail('Se esperaba un error 404, pero se recibió una respuesta de éxito.'),
        error: (error: HttpErrorResponse) => {
          expect(error.status).toEqual(errorStatus);
          expect(error.statusText).toEqual(errorStatusText);
        }
      });

      const req = httpTestingController.expectOne(testUrl);
      req.flush('Simulated 404 error', { status: errorStatus, statusText: errorStatusText });
    });
  });

//Test para el metodo de la API getcharacterbyid
  describe('getCharacterById', () => {

    it('Caso de Éxito: debe hacer GET al ID correcto y retornar un único personaje', () => {
      const testId = 1;
      const expectedUrl = `${apiUrl}/${testId}`;

      service.getCharacterById(testId).subscribe(character => {
        expect(character).toEqual(MOCK_SINGLE_CHARACTER);
        expect(character.name).toBe('Rick Sanchez');
      });

      const req = httpTestingController.expectOne(expectedUrl);

      expect(req.request.method).toEqual('GET');

      req.flush(MOCK_SINGLE_CHARACTER);
    });
  });
});