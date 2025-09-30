import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { LanguageSelectorComponent } from './language-selector.component';
import { LanguageService } from '../../services/language.service';

describe('LanguageSelectorComponent Integration Test', () => {
  let component: LanguageSelectorComponent;
  let fixture: ComponentFixture<LanguageSelectorComponent>;
  let languageService: LanguageService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LanguageSelectorComponent],
      imports: [HttpClientTestingModule],
      providers: [LanguageService],
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageSelectorComponent);
    component = fixture.componentInstance;
    languageService = TestBed.inject(LanguageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should integrate component with real service and handle full language switch flow', () => {
    component.ngOnInit();

    expect(component.currentLanguage).toBe('en');
    expect(component.supportedLanguages).toEqual([
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'es', name: 'Español', flag: '🇪🇸' },
    ]);
    expect(component.showDropdown).toBe(false);

    component.toggleDropdown();
    expect(component.showDropdown).toBe(true);

    component.switchLanguage('es');

    expect(languageService.getCurrentLanguage()).toBe('es');
    expect(component.showDropdown).toBe(false);

    component.ngOnInit();

    expect(component.currentLanguage).toBe('es');
    expect(component.getCurrentLanguageName()).toBe('Español');
    expect(component.getCurrentLanguageFlag()).toBe('🇪🇸');

    httpMock.expectNone(() => true);
  });
});
