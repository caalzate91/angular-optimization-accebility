import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { LanguageService, LanguageApiResponse } from './language.service';

describe('LanguageService', () => {
  let service: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LanguageService],
    });
    service = TestBed.inject(LanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return supported languages', () => {
    const languages = service.getSupportedLanguages();
    expect(languages.length).toBe(2);
    expect(languages[0]).toEqual({ code: 'en', name: 'English', flag: '🇺🇸' });
    expect(languages[1]).toEqual({ code: 'es', name: 'Español', flag: '🇪🇸' });
  });
  it('should detect user language', () => {
    Object.defineProperty(navigator, 'language', {
      value: 'es-ES',
      configurable: true,
    });
    const userLang = service.detectUserLanguage();
    expect(['en', 'es']).toContain(userLang);
  });

  it('should get current language', () => {
    service['currentLanguage'] = 'es';
    const currentLang = service.getCurrentLanguage();
    expect(currentLang).toBe('es');
  });

  // HTTP Integration Tests
  describe('loadLanguagesFromApi', () => {
    let httpMock: HttpTestingController;

    beforeEach(() => {
      httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
      httpMock.verify();
    });

    it('should successfully load languages from API (HTTP success case)', () => {
      const mockResponse: LanguageApiResponse = {
        languages: [
          { code: 'en', name: 'English', flag: '🇺🇸' },
          { code: 'es', name: 'Español', flag: '🇪🇸' },
          { code: 'fr', name: 'Français', flag: '🇫🇷' },
        ],
      };

      service.loadLanguagesFromApi().subscribe((response) => {
        expect(response).toEqual(mockResponse);
        expect(response.languages.length).toBe(3);
        expect(response.languages[0].code).toBe('en');
        expect(response.languages[2].name).toBe('Français');
      });

      const req = httpMock.expectOne('https://api.example.com/languages');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should handle API error when loading languages (HTTP error case)', () => {
      const errorMessage = 'Failed to load languages';

      service.loadLanguagesFromApi().subscribe({
        next: () => fail('Expected an error, but got success'),
        error: (error) => {
          expect(error.status).toBe(500);
          expect(error.statusText).toBe('Internal Server Error');
        },
      });

      const req = httpMock.expectOne('https://api.example.com/languages');
      expect(req.request.method).toBe('GET');
      req.flush(errorMessage, {
        status: 500,
        statusText: 'Internal Server Error',
      });
    });
  });
});
