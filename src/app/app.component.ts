import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-sofkau';
  currentLang: string = 'en'; // idioma por defecto

  ngOnInit(): void {
    this.detectBrowserLanguage();
  }

  detectBrowserLanguage(): void {
    const lang = navigator.language; // ej. "es-CO", "en-US"
    const shortLang = lang.split('-')[0]; // solo "es", "en"
    this.currentLang = shortLang;

    console.log(`Idioma del navegador detectado: ${this.currentLang}`);
  }
}
