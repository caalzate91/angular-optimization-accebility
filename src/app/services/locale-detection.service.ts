import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LocaleDetectionService {
  
  constructor(
    @Inject(LOCALE_ID) private currentLocale: string,
    @Inject(DOCUMENT) private document: Document
  ) {}

  /**
   * Detecta el idioma del navegador y redirige si es necesario
   */
  detectAndRedirectIfNeeded(): void {
    const currentPath = this.document.location.pathname;
    const supportedLocales = ['en', 'es'];
    
    // Si ya estamos en una ruta con idioma, no hacer nada
    if (this.hasLanguagePrefix(currentPath, supportedLocales)) {
      return;
    }

    // Detectar idioma preferido del navegador
    let detectedLocale = this.detectBrowserLanguage();
    
    // Si el idioma detectado no está soportado, usar inglés por defecto
    if (!supportedLocales.includes(detectedLocale)) {
      detectedLocale = 'en';
    }

    // Redirigir a la URL con el idioma apropiado
    const newPath = `/${detectedLocale}${currentPath === '/' ? '' : currentPath}`;
    this.document.location.href = newPath;
  }

  /**
   * Verifica si la ruta actual ya tiene un prefijo de idioma
   */
  private hasLanguagePrefix(path: string, supportedLocales: string[]): boolean {
    const pathSegments = path.split('/').filter(segment => segment.length > 0);
    return pathSegments.length > 0 && supportedLocales.includes(pathSegments[0]);
  }

  /**
   * Detecta el idioma preferido del navegador
   */
  private detectBrowserLanguage(): string {
    if (typeof navigator !== 'undefined') {
      const browserLang = navigator.language || (navigator as any).userLanguage;
      return browserLang.split('-')[0].toLowerCase();
    }
    return 'en';
  }

  /**
   * Obtiene el idioma actual de la URL
   */
  getCurrentLanguageFromUrl(): string {
    const currentPath = this.document.location.pathname;
    const pathSegments = currentPath.split('/').filter(segment => segment.length > 0);
    const supportedLocales = ['en', 'es'];
    
    if (pathSegments.length > 0 && supportedLocales.includes(pathSegments[0])) {
      return pathSegments[0];
    }
    
    return 'en'; // idioma por defecto
  }

  /**
   * Cambia el idioma y redirige
   */
  changeLanguage(newLanguage: string): void {
    const currentPath = this.document.location.pathname;
    const currentLang = this.getCurrentLanguageFromUrl();
    
    let newPath: string;
    
    if (this.hasLanguagePrefix(currentPath, ['en', 'es'])) {
      // Reemplazar el idioma actual con el nuevo
      newPath = currentPath.replace(`/${currentLang}`, `/${newLanguage}`);
    } else {
      // Agregar el nuevo idioma al path
      newPath = `/${newLanguage}${currentPath === '/' ? '' : currentPath}`;
    }
    
    this.document.location.href = newPath;
  }
}