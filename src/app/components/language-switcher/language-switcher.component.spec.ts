import { LanguageSwitcherComponent } from './language-switcher.component';

describe('LanguageSwitcherComponent', () => {
  let component: LanguageSwitcherComponent;

  beforeEach(() => {
    component = new LanguageSwitcherComponent();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have two locales defined', () => {
    expect(component.locales.length).toBe(2);
  });

  it('should include Spanish locale', () => {
    const hasSpanish = component.locales.some(
      (locale) => locale.code === 'es' && locale.label === 'Español'
    );
    expect(hasSpanish).toBe(true);
  });

  it('should include English locale', () => {
    const hasEnglish = component.locales.some(
      (locale) => locale.code === 'en-US' && locale.label === 'English'
    );
    expect(hasEnglish).toBe(true);
  });
});
