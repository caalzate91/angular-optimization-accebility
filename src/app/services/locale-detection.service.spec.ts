import { TestBed } from '@angular/core/testing';
import { LocaleDetectionService } from './locale-detection.service';
import { LOCALE_ID } from '@angular/core';
import { DOCUMENT } from '@angular/common';

describe('LocaleDetectionService', () => {
  let service: LocaleDetectionService;
  let mockDocument: any;

  beforeEach(() => {
    mockDocument = {
      location: {
        pathname: '/',
        href: '/'
      },
      // Provide minimal DOM methods used by Angular's test teardown
      querySelectorAll: () => [],
      createElement: (tag: string) => ({ tagName: tag.toUpperCase() })
    };

    TestBed.configureTestingModule({
      providers: [
        LocaleDetectionService,
        { provide: LOCALE_ID, useValue: 'en-US' },
        { provide: DOCUMENT, useValue: mockDocument }
      ]
    });

    service = TestBed.inject(LocaleDetectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should detect language from URL', () => {
    mockDocument.location.pathname = '/es/characters';

    const language = service.getCurrentLanguageFromUrl();
    expect(language).toBe('es');
  });

  it('should return default language for root path', () => {
    mockDocument.location.pathname = '/';

    const language = service.getCurrentLanguageFromUrl();
    expect(language).toBe('en');
  });

  it('should return default language for path without language prefix', () => {
    mockDocument.location.pathname = '/characters';

    const language = service.getCurrentLanguageFromUrl();
    expect(language).toBe('en');
  });

  it('should change language and update URL', () => {
    mockDocument.location.pathname = '/en/characters';

    service.changeLanguage('es');
    // LocaleDetectionService should update location.href
    expect(mockDocument.location.href).toContain('/es/characters');
  });

  it('should add language prefix to root path', () => {
    mockDocument.location.pathname = '/';

    service.changeLanguage('es');
    expect(mockDocument.location.href).toContain('/es');
  });
});