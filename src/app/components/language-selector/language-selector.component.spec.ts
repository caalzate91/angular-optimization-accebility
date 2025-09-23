import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageSelectorComponent } from './language-selector.component';
import { LanguageService } from '../../services/language.service';
import { of } from 'rxjs';

describe('LanguageSelectorComponent', () => {
  let component: LanguageSelectorComponent;
  let fixture: ComponentFixture<LanguageSelectorComponent>;
  let languageService: Partial<Record<string, jest.Mock>> & { getLanguageObservable?: jest.Mock, getCurrentLanguageInfo?: jest.Mock, changeLanguage?: jest.Mock };

  beforeEach(async () => {
    const languageServiceSpy = {
      changeLanguage: jest.fn(),
      getCurrentLanguageInfo: jest.fn(),
      getLanguageObservable: jest.fn(),
      supportedLanguages: [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'es', name: 'Español', flag: '🇪🇸' }
      ]
    };

    await TestBed.configureTestingModule({
      declarations: [LanguageSelectorComponent],
      providers: [
        { provide: LanguageService, useValue: languageServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageSelectorComponent);
    component = fixture.componentInstance;
    languageService = TestBed.inject(LanguageService) as any;

    (languageService.getLanguageObservable as jest.Mock).mockReturnValue(of('en'));
    (languageService.getCurrentLanguageInfo as jest.Mock).mockReturnValue({ code: 'en', name: 'English', flag: '🇺🇸' });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with supported languages', () => {
    fixture.detectChanges();
    
    expect(component.supportedLanguages).toEqual([
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'es', name: 'Español', flag: '🇪🇸' }
    ]);
  });

  it('should toggle dropdown', () => {
  expect(component.isDropdownOpen).toBe(false);
    
    component.toggleDropdown();
  expect(component.isDropdownOpen).toBe(true);
    
    component.toggleDropdown();
  expect(component.isDropdownOpen).toBe(false);
  });

  it('should close dropdown', () => {
    component.isDropdownOpen = true;
    
  component.closeDropdown();
  expect(component.isDropdownOpen).toBe(false);
  });

  it('should change language and close dropdown', () => {
    component.isDropdownOpen = true;
    
    component.changeLanguage('es');
    
  expect((languageService.changeLanguage as jest.Mock)).toHaveBeenCalledWith('es');
  expect(component.isDropdownOpen).toBe(false);
  });

  it('should not change to same language', () => {
    component.currentLanguage = 'en';
    
    component.changeLanguage('en');
    
  expect((languageService.changeLanguage as jest.Mock)).not.toHaveBeenCalled();
  });

  it('should handle document click to close dropdown', () => {
    component.isDropdownOpen = true;
    
    const mockEvent = new Event('click');
    Object.defineProperty(mockEvent, 'target', {
      value: document.createElement('div')
    });
    
    component.onDocumentClick(mockEvent);
  expect(component.isDropdownOpen).toBe(false);
  });

  it('should render language button', () => {
    fixture.detectChanges();
    
    const button = fixture.nativeElement.querySelector('.language-button');
    expect(button).toBeTruthy();
    expect(button.textContent).toContain('English');
  });

  it('should render dropdown options', () => {
    component.isDropdownOpen = true;
    fixture.detectChanges();
    
    const options = fixture.nativeElement.querySelectorAll('.language-option');
    expect(options.length).toBe(2);
  });
});