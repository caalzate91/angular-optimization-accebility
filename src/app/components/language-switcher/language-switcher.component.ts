import { Component } from '@angular/core';
import { LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.css'],
})
export class LanguageSwitcherComponent {
  constructor(public localeService: LocaleService) {}

  onLocaleChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const value = select.value;
    this.localeService.setLocale(value);
  }
}
