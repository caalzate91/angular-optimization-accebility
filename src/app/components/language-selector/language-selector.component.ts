import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LanguageService, Language } from '../../services/language.service';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css']
})
export class LanguageSelectorComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  currentLanguage: string = 'en';
  supportedLanguages: Language[] = [];
  isDropdownOpen = false;

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.supportedLanguages = this.languageService.supportedLanguages;
    
    // Suscribirse a cambios de idioma
    this.languageService.getLanguageObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe(language => {
        this.currentLanguage = language;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Alterna la apertura del dropdown
   */
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  /**
   * Cierra el dropdown
   */
  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  /**
   * Cambia el idioma de la aplicación
   */
  changeLanguage(languageCode: string): void {
    if (languageCode !== this.currentLanguage) {
      this.languageService.changeLanguage(languageCode);
    }
    this.closeDropdown();
  }

  /**
   * Obtiene la información del idioma actual
   */
  getCurrentLanguageInfo(): Language {
    return this.languageService.getCurrentLanguageInfo();
  }

  /**
   * Maneja clics fuera del componente para cerrar el dropdown
   */
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const component = target.closest('.language-selector');
    
    if (!component) {
      this.closeDropdown();
    }
  }
}
