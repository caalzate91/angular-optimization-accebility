import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageSelectorComponent } from './language-selector.component';
import { LanguageService } from '../../services/language.service';

describe('LanguageSelectorComponent', () => {
  let component: LanguageSelectorComponent;
  let fixture: ComponentFixture<LanguageSelectorComponent>;
  let mockLanguageService: jest.Mocked<LanguageService>;

  beforeEach(async () => {
    mockLanguageService = {
      getCurrentLanguage: jest.fn(),
      getSupportedLanguages: jest.fn(),
      switchLanguage: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      declarations: [LanguageSelectorComponent],
      providers: [{ provide: LanguageService, useValue: mockLanguageService }],
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageSelectorComponent);
    component = fixture.componentInstance;

    // Setup default mock returns
    mockLanguageService.getCurrentLanguage.mockReturnValue('en');
    mockLanguageService.getSupportedLanguages.mockReturnValue([
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'es', name: 'Español', flag: '🇪🇸' },
    ]);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with current language', () => {
    component.ngOnInit();
    expect(component.currentLanguage).toBe('en');
    expect(mockLanguageService.getCurrentLanguage).toHaveBeenCalled();
  });

  it('should toggle dropdown', () => {
    expect(component.showDropdown).toBe(false);
    component.toggleDropdown();
    expect(component.showDropdown).toBe(true);
    component.toggleDropdown();
    expect(component.showDropdown).toBe(false);
  });

  it('should switch language when different', () => {
    component.currentLanguage = 'en';
    component.switchLanguage('es');
    expect(mockLanguageService.switchLanguage).toHaveBeenCalledWith('es');
  });

  it('should not switch language when same', () => {
    component.currentLanguage = 'en';
    component.switchLanguage('en');
    expect(mockLanguageService.switchLanguage).not.toHaveBeenCalled();
  });
});
