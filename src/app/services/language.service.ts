import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocaleDetectionService } from './locale-detection.service';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<string>('en');
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  public readonly supportedLanguages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ];

  constructor(
    @Inject(LOCALE_ID) private localeId: string,
    private localeDetectionService: LocaleDetectionService
  ) {
    // Obtener idioma actual de la URL o usar el locale actual
    const currentLanguage = this.localeDetectionService.getCurrentLanguageFromUrl();
    this.currentLanguageSubject.next(currentLanguage);
  }



  /**
   * Obtiene el idioma actual
   */
  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  /**
   * Cambia el idioma de la aplicación
   */
  changeLanguage(languageCode: string): void {
    if (this.isLanguageSupported(languageCode)) {
      this.localeDetectionService.changeLanguage(languageCode);
    }
  }

  /**
   * Verifica si un idioma está soportado
   */
  private isLanguageSupported(languageCode: string): boolean {
    return this.supportedLanguages.some(lang => lang.code === languageCode);
  }



  /**
   * Obtiene información del idioma actual
   */
  getCurrentLanguageInfo(): Language {
    const currentLang = this.getCurrentLanguage();
    return this.supportedLanguages.find(lang => lang.code === currentLang) || this.supportedLanguages[0];
  }

  /**
   * Observable para escuchar cambios de idioma
   */
  getLanguageObservable(): Observable<string> {
    return this.currentLanguage$;
  }
}