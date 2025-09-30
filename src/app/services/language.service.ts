import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface LanguageApiResponse {
  languages: Language[];
}

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLanguage: string = 'en';
  private supportedLanguages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ];

  constructor(private http: HttpClient) {}

  getSupportedLanguages(): Language[] {
    return this.supportedLanguages;
  }

  detectUserLanguage(): string {
    const browserLang = navigator.language.split('-')[0];
    return this.supportedLanguages.some((lang) => lang.code === browserLang)
      ? browserLang
      : 'en';
  }

  getCurrentLanguage(): string {
    return this.currentLanguage;
  }

  setCurrentLanguage(lang: string): void {
    if (this.supportedLanguages.some((l) => l.code === lang)) {
      this.currentLanguage = lang;
    }
  }

  switchLanguage(lang: string): void {
    this.setCurrentLanguage(lang);
  }

  loadLanguagesFromApi(): Observable<LanguageApiResponse> {
    return this.http.get<LanguageApiResponse>('https://api.example.com/languages');
  }
}
