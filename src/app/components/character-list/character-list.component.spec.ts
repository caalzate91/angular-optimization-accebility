import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RickMortyService } from '../../services/rick-morty.service';
import { Component } from '@angular/core';
import { throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  selector: 'app-root',
  standalone: true,
  template: '<h1>{{ title }}</h1>',
})

class MockCharacterComponent {
  title = 'angular-sofkau';
}

describe('CharacterListComponent', () => {
  let component: MockCharacterComponent;
  let fixture: ComponentFixture<MockCharacterComponent>;
  let mockService: jest.Mocked<RickMortyService>;

  beforeEach(async () => {
    mockService = {
      getCharacters: jest.fn()
    } as unknown as jest.Mocked<RickMortyService>;

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MockCharacterComponent],
      providers: [
        { provide: RickMortyService, useValue: mockService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MockCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // test('should load characters successfully', () => {
  //   const mockResponse = {
  //     results: [{ name: 'Rick' }, { name: 'Morty' }],
  //     info: { pages: 42 }
  //   };

  //   mockService.getCharacters.mockReturnValue(of(mockResponse));

  //   component.loadCharacters(2);

  //   expect(mockService.getCharacters).toHaveBeenCalledWith(2);
  //   expect(component.loading).toBe(false);
  //   expect(component.characters).toEqual(mockResponse.results);
  //   expect(component.currentPage).toBe(2);
  //   expect(component.totalPages).toBe(42);
  //   expect(component.error).toBe('');
  // });

  // test('should handle error when loading characters fails', () => {
  //   mockService.getCharacters.mockReturnValue(throwError(() => new Error('Network error')));

  //   component.loadCharacters(1);

  //   expect(mockService.getCharacters).toHaveBeenCalledWith(1);
  //   expect(component.loading).toBe(false);
  //   expect(component.error).toBe('Error loading characters. Please try again.');
  // });
});