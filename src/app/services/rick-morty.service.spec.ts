import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RickMortyService, Character, ApiResponse } from './rick-morty.service';

describe('RickMortyService', () => {
  let service: RickMortyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RickMortyService]
    });
    service = TestBed.inject(RickMortyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCharacters', () => {
    it('should fetch characters for page 1 by default', () => {
      const mockResponse: ApiResponse = {
        info: {
          count: 826,
          pages: 42,
          next: 'https://rickandmortyapi.com/api/character?page=2',
          prev: null
        },
        results: [
          {
            id: 1,
            name: 'Rick Sanchez',
            status: 'Alive',
            species: 'Human',
            type: '',
            gender: 'Male',
            origin: {
              name: 'Earth (C-137)',
              url: 'https://rickandmortyapi.com/api/location/1'
            },
            location: {
              name: 'Citadel of Ricks',
              url: 'https://rickandmortyapi.com/api/location/3'
            },
            image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
            episode: ['https://rickandmortyapi.com/api/episode/1'],
            url: 'https://rickandmortyapi.com/api/character/1',
            created: '2017-11-04T18:48:46.250Z'
          }
        ]
      };

      service.getCharacters().subscribe(response => {
        expect(response).toEqual(mockResponse);
        expect(response.results.length).toBe(1);
        expect(response.results[0].name).toBe('Rick Sanchez');
      });

      const req = httpMock.expectOne('https://rickandmortyapi.com/api/character?page=1');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should fetch characters for specific page', () => {
      const mockResponse: ApiResponse = {
        info: {
          count: 826,
          pages: 42,
          next: 'https://rickandmortyapi.com/api/character?page=4',
          prev: 'https://rickandmortyapi.com/api/character?page=2'
        },
        results: []
      };

      service.getCharacters(3).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('https://rickandmortyapi.com/api/character?page=3');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should handle HTTP errors', () => {
      service.getCharacters().subscribe({
        next: () => fail('Expected an error'),
        error: (error) => {
          expect(error.status).toBe(404);
        }
      });

      const req = httpMock.expectOne('https://rickandmortyapi.com/api/character?page=1');
      req.flush('Not Found', { status: 404, statusText: 'Not Found' });
    });

    // Nuevas pruebas agregadas

    it('should perform GET to correct URL and return mocked ApiResponse (success)', () => {
      const mockResponse: ApiResponse = {
        info: { count: 2, pages: 1, next: null, prev: null },
        results: [
          {
            id: 42,
            name: 'Test Character',
            status: 'Unknown',
            species: 'Alien',
            type: 'TestType',
            gender: 'Genderless',
            origin: { name: 'Unknown', url: '' },
            location: { name: 'Unknown', url: '' },
            image: 'https://example.com/avatar.png',
            episode: [],
            url: 'https://rickandmortyapi.com/api/character/42',
            created: new Date().toISOString()
          }
        ]
      };

      service.getCharacters(2).subscribe(response => {
        // verify simulated response
        expect(response).toEqual(mockResponse);
        expect(response.results[0].id).toBe(42);
      });

      const req = httpMock.expectOne('https://rickandmortyapi.com/api/character?page=2');
      // verify HTTP method
      expect(req.request.method).toBe('GET');
      // send mock response
      req.flush(mockResponse);
    });

    it('should propagate server errors (500) when getting characters', () => {
      service.getCharacters(5).subscribe({
        next: () => fail('Expected an error response'),
        error: (err) => {
          expect(err.status).toBe(500);
          expect(err.statusText).toBe('Server Error');
        }
      });

      const req = httpMock.expectOne('https://rickandmortyapi.com/api/character?page=5');
      expect(req.request.method).toBe('GET');
      req.flush('Internal Server Error', { status: 500, statusText: 'Server Error' });
    });
  });


  describe('getCharacterById', () => {
    it('should fetch character by id', () => {
      const mockCharacter: Character = {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: {
          name: 'Earth (C-137)',
          url: 'https://rickandmortyapi.com/api/location/1'
        },
        location: {
          name: 'Citadel of Ricks',
          url: 'https://rickandmortyapi.com/api/location/3'
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        episode: ['https://rickandmortyapi.com/api/episode/1'],
        url: 'https://rickandmortyapi.com/api/character/1',
        created: '2017-11-04T18:48:46.250Z'
      };

      service.getCharacterById(1).subscribe(character => {
        expect(character).toEqual(mockCharacter);
        expect(character.id).toBe(1);
        expect(character.name).toBe('Rick Sanchez');
      });

      const req = httpMock.expectOne('https://rickandmortyapi.com/api/character/1');
      expect(req.request.method).toBe('GET');
      req.flush(mockCharacter);
    });

    it('should handle character not found', () => {
      service.getCharacterById(999).subscribe({
        next: () => fail('Expected an error'),
        error: (error) => {
          expect(error.status).toBe(404);
        }
      });

      const req = httpMock.expectOne('https://rickandmortyapi.com/api/character/999');
      req.flush('Character not found', { status: 404, statusText: 'Not Found' });
    });
  });
});
