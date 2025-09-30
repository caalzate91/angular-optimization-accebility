import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';

// Importar la función de localización
declare const $localize: any;

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css']
})
export class LanguageSelectorComponent implements OnInit {
  currentLanguage = 'en';
  supportedLanguages: any[] = [];
  showDropdown = false;

  constructor(private languageService: LanguageService) { }

  ngOnInit(): void {
    this.currentLanguage = this.languageService.getCurrentLanguage();
    this.supportedLanguages = this.languageService.getSupportedLanguages();
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  switchLanguage(languageCode: string): void {
    if (languageCode !== this.currentLanguage) {
      this.languageService.switchLanguage(languageCode);
    }
    this.showDropdown = false;
  }

  getCurrentLanguageName(): string {
    const current = this.supportedLanguages.find(lang => lang.code === this.currentLanguage);
    return current ? current.name : 'English';
  }

  getCurrentLanguageFlag(): string {
    const current = this.supportedLanguages.find(lang => lang.code === this.currentLanguage);
    return current ? current.flag : '🇺🇸';
  }

  getLanguageText(): string {
    return $localize`:@@language-selector:Language`;
  }
}
