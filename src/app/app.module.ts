import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeFr from '@angular/common/locales/fr';
import localeEn from '@angular/common/locales/en';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';
import { NgOptimizedImage } from '@angular/common';

registerLocaleData(localeEn);
registerLocaleData(localeEs);
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    CharacterListComponent,
    LanguageSwitcherComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgOptimizedImage,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useFactory: () => {
        try {
          const savedLocale = localStorage.getItem('locale');
          const browserLang = navigator.language.split('-')[0];
          return (
            savedLocale ||
            (browserLang === 'es' || browserLang === 'fr' ? browserLang : 'en')
          );
        } catch {
          return 'en';
        }
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
