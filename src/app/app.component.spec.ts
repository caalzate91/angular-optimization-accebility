import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TranslateService } from '@ngx-translate/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let translateServiceMock: jest.Mocked<TranslateService>;

  beforeEach(async () => {
    translateServiceMock = {
      use: jest.fn()
    } as unknown as jest.Mocked<TranslateService>;

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AppComponent
      ],
      providers: [
        TranslateService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


  test('It should use the browsers language if available', () => {
    const mockTarget = {
      target: {
        value: 'es'
      }
    } as unknown as Event;
    Object.defineProperty(window.navigator, 'language', {
      value: 'es-CO',
      configurable: true
    });
    component.onLanguageChange(mockTarget);
    expect(translateServiceMock.use).toHaveBeenCalledWith('es');
  });

  test('It should change the language when a new one is selected', () => {
    const mockEvent = {
      target: {
        value: 'es'
      }
    } as unknown as Event;
    component.onLanguageChange(mockEvent);
    expect(translateServiceMock.use).toHaveBeenCalledWith('es');
  });

});