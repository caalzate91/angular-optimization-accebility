import { Injectable, LOCALE_ID, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  private readonly SUPPORTED_LOCALES = ['en', 'es', 'fr'];
  private readonly DEFAULT_LOCALE = 'en';

  constructor(@Inject(LOCALE_ID) private currentLocale: string) {}

  getCurrentLocale(): string {
    return this.currentLocale;
  }

  getSupportedLocales(): string[] {
    return this.SUPPORTED_LOCALES;
  }

  setLocale(locale: string): void {
    if (this.SUPPORTED_LOCALES.includes(locale)) {
      try {
        localStorage.setItem('locale', locale);
        // En desarrollo, recargamos la página para aplicar el nuevo locale
        // En producción, esto debería navegar a la URL localizada
        if (this.isDevelopment()) {
          window.location.reload();
        } else {
          this.navigateToLocalizedUrl(locale);
        }
      } catch (error) {
        console.warn('Could not save locale preference:', error);
      }
    }
  }

  private isDevelopment(): boolean {
    return (
      !window.location.hostname ||
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1'
    );
  }

  private navigateToLocalizedUrl(locale: string): void {
    const currentPath = window.location.pathname.replace(/^\/(en|es|fr)/, '');
    const basePath = locale === 'en' ? '' : `/${locale}`;
    const newUrl = `${basePath}${currentPath}` || basePath || '/';
    window.location.assign(newUrl);
  }

  getLocaleDisplayName(locale: string): string {
    const names: { [key: string]: string } = {
      en: 'English',
      es: 'Español',
      fr: 'Français',
    };
    return names[locale] || locale;
  }
}
