import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { NgOptimizedImage } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterListComponent } from './components/character-list/character-list.component';

// Importa tu nuevo componente aquí
import { SimpleComponent } from './services/components/simple/simple.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterListComponent,
    SimpleComponent   // <-- Agrega el componente aquí
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgOptimizedImage // 👈 Agregado aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
