import { Component, inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [NgOptimizedImage, HttpClientModule, CharacterListComponent, CommonModule, TranslateModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-sofkau';
  currentLang = 'en';

  private readonly translate = inject(TranslateService);
  
  constructor() {
    const browserLang = navigator.language.split('-')[0];
    const supportedLangs = ['en', 'es'];
    const langToUse = supportedLangs.includes(browserLang) ? browserLang : 'en';
    this.translate.use(langToUse);
  }

  onLanguageChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const selectedLang = select.value;
    this.translate.use(selectedLang);
  }
}
