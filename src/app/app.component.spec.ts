import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';

// Mock del CharacterListComponent
@Component({
  selector: 'app-language-selector',
  template: '<div>Language Selector Mock</div>',
})
class MockLanguageSelectorComponent {}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent], // Remove MockCharacterListComponent
      schemas: [NO_ERRORS_SCHEMA], // Add this
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-sofkau'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-sofkau');
  });

  it('should render the app structure', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.app-container')).toBeTruthy();
    expect(compiled.querySelector('.app-header')).toBeTruthy();
    expect(compiled.querySelector('.main-content')).toBeTruthy();
    expect(compiled.querySelector('.app-footer')).toBeTruthy();
  });

  it('should contain character list component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('app-character-list')).toBeTruthy();
  });

  it('should display footer content', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const footer = compiled.querySelector('.footer-text');
    expect(footer?.textContent).toContain(
      '2025 Rick and Morty Character Explorer'
    );
    expect(footer?.textContent).toContain('The Rick and Morty API');
  });
});
