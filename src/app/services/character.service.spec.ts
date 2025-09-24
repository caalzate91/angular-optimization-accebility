import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CharacterService } from './character.service';

describe('CharacterService', () => {
    let service: CharacterService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CharacterService]
        });

        service = TestBed.inject(CharacterService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should fetch characters from the API (success case)', () => {
        const mockResponse = {
            results: [{ id: 1, name: 'Rick Sanchez' }]
        };

        service.getCharacters().subscribe((data: any) => {  // Aquí declaramos explícitamente tipo any
            expect(data.results.length).toBe(1);
            expect(data.results[0].name).toBe('Rick Sanchez');
        });

        const req = httpMock.expectOne('https://rickandmortyapi.com/api/character');
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });
});
