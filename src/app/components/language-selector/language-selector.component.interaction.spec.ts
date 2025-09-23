import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LanguageSelectorComponent } from './language-selector.component';
import { LanguageService } from '../../services/language.service';
import { LocaleDetectionService } from '../../services/locale-detection.service';
import { of } from 'rxjs';

describe('LanguageSelectorComponent - Interaction', () => {
  let component: LanguageSelectorComponent;
  let fixture: ComponentFixture<LanguageSelectorComponent>;
  let languageServiceSpy: any;
  let localeDetectionSpy: any;

  beforeEach(async () => {
    const lsSpy = {
      changeLanguage: jest.fn(),
      getLanguageObservable: jest.fn().mockReturnValue(of('en')),
      getCurrentLanguageInfo: jest.fn().mockReturnValue({ code: 'en', name: 'English', flag: '🇺🇸' }),
      supportedLanguages: [ { code: 'en', name: 'English', flag: '�🇸' }, { code: 'es', name: 'Español', flag: '�🇸' } ]
    };

    const ldSpy = {
      getCurrentLanguageFromUrl: jest.fn().mockReturnValue('en'),
      changeLanguage: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [LanguageSelectorComponent],
      providers: [
        { provide: LanguageService, useValue: lsSpy },
        { provide: LocaleDetectionService, useValue: ldSpy }
      ]
    }).compileComponents();

  languageServiceSpy = TestBed.inject(LanguageService) as any;
  localeDetectionSpy = TestBed.inject(LocaleDetectionService) as any;

    fixture = TestBed.createComponent(LanguageSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render current language and open dropdown on button click', () => {
    const button = fixture.debugElement.query(By.css('.language-button'));
    expect(button).toBeTruthy();
    expect(button.nativeElement.getAttribute('aria-expanded')).toBe('false');

    // Click to open
    button.nativeElement.click();
    fixture.detectChanges();

  expect(component.isDropdownOpen).toBe(true);
    expect(button.nativeElement.getAttribute('aria-expanded')).toBe('true');
  });

  it('should change language when an option is clicked and close dropdown', () => {
    const button = fixture.debugElement.query(By.css('.language-button'));
    button.nativeElement.click();
    fixture.detectChanges();

    const options = fixture.debugElement.queryAll(By.css('.language-option'));
    expect(options.length).toBeGreaterThan(0);

    // Click the second option (es)
    options[1].nativeElement.click();
    fixture.detectChanges();

  expect(languageServiceSpy.changeLanguage).toHaveBeenCalledWith('es');
  expect(component.isDropdownOpen).toBe(false);
  });
});
