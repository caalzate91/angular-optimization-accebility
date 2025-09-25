import { Component } from '@angular/core';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.css'],
})
export class LanguageSwitcherComponent {
  locales = [
    { code: 'en-US', label: 'English' },
    { code: 'es', label: 'Español' },
  ];
}
