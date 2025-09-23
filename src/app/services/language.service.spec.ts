import { TestBed } from '@angular/core/testing';
import { LanguageService } from './language.service';
import { LocaleDetectionService } from './locale-detection.service';
import { LOCALE_ID } from '@angular/core';
import { DOCUMENT } from '@angular/common';

describe('LanguageService', () => {
  let service: LanguageService;
  let localeDetectionService: Partial<Record<string, jest.Mock>> & { getCurrentLanguageFromUrl?: jest.Mock, changeLanguage?: jest.Mock };
  let mockDocument: any;

  beforeEach(() => {
    // Create Jest-friendly mocks
    localeDetectionService = {
      getCurrentLanguageFromUrl: jest.fn().mockReturnValue('en'),
      changeLanguage: jest.fn()
    };

    mockDocument = {
      location: {
        pathname: '/en/'
      },
      querySelectorAll: () => [],
      createElement: (tag: string) => ({ tagName: tag.toUpperCase() })
    };

    TestBed.configureTestingModule({
      providers: [
        LanguageService,
        { provide: LocaleDetectionService, useValue: localeDetectionService },
        { provide: LOCALE_ID, useValue: 'en-US' },
        { provide: DOCUMENT, useValue: mockDocument }
      ]
    });

    service = TestBed.inject(LanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have supported languages', () => {
    expect(service.supportedLanguages).toEqual([
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'es', name: 'Español', flag: '🇪🇸' }
    ]);
  });

  it('should get current language from URL', () => {
    (localeDetectionService.getCurrentLanguageFromUrl as jest.Mock).mockReturnValue('es');

    const currentLang = service.getCurrentLanguage();
    expect((localeDetectionService.getCurrentLanguageFromUrl as jest.Mock)).toHaveBeenCalled();
  });

  it('should change language through LocaleDetectionService', () => {
    service.changeLanguage('es');
    expect((localeDetectionService.changeLanguage as jest.Mock)).toHaveBeenCalledWith('es');
  });

  it('should not change to unsupported language', () => {
    service.changeLanguage('fr');
    expect((localeDetectionService.changeLanguage as jest.Mock)).not.toHaveBeenCalled();
  });

  it('should get current language info', () => {
    jest.spyOn(service as any, 'getCurrentLanguage').mockReturnValue('es');

    const langInfo = service.getCurrentLanguageInfo();
    expect(langInfo).toEqual({ code: 'es', name: 'Español', flag: '🇪🇸' });
  });
});