import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RickMortyService, ApiResponse, Character } from './rick-morty.service';

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

  it('should fetch characters for page 1 by default', (done) => {
    const mockResponse: ApiResponse = {
      info: { count: 1, pages: 1, next: null, prev: null },
      results: [
        {
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          origin: { name: 'Earth (C-137)', url: '' },
          location: { name: 'Citadel of Ricks', url: '' },
          image: '',
          episode: [],
          url: '',
          created: ''
        }
      ]
    };

    service.getCharacters().subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(response.results.length).toBe(1);
      done();
    });

    const req = httpMock.expectOne('https://rickandmortyapi.com/api/character?page=1');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch characters for specific page', (done) => {
    const mockResponse: ApiResponse = {
      info: { count: 0, pages: 0, next: null, prev: null },
      results: []
    };

    service.getCharacters(3).subscribe(response => {
      expect(response).toEqual(mockResponse);
      done();
    });

    const req = httpMock.expectOne('https://rickandmortyapi.com/api/character?page=3');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle HTTP errors when fetching characters', (done) => {
    service.getCharacters().subscribe({
      next: () => fail('Expected an error'),
      error: (error) => {
        expect(error.status).toBe(404);
        done();
      }
    });

    const req = httpMock.expectOne('https://rickandmortyapi.com/api/character?page=1');
    req.flush('Not Found', { status: 404, statusText: 'Not Found' });
  });

  it('should fetch character by id', (done) => {
    const mockCharacter: Character = {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth (C-137)', url: '' },
      location: { name: 'Citadel of Ricks', url: '' },
      image: '',
      episode: [],
      url: '',
      created: ''
    };

    service.getCharacterById(1).subscribe(character => {
      expect(character).toEqual(mockCharacter);
      expect(character.id).toBe(1);
      done();
    });

    const req = httpMock.expectOne('https://rickandmortyapi.com/api/character/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockCharacter);
  });

  it('should handle character not found', (done) => {
    service.getCharacterById(999).subscribe({
      next: () => fail('Expected an error'),
      error: (error) => {
        expect(error.status).toBe(404);
        done();
      }
    });

    const req = httpMock.expectOne('https://rickandmortyapi.com/api/character/999');
    req.flush('Character not found', { status: 404, statusText: 'Not Found' });
  });
});

