import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RickMortyService } from '../../services/rick-morty.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CharacterListComponent } from './character-list.component';
import { of, throwError } from 'rxjs';


describe('CharacterListComponent', () => {
  let component: CharacterListComponent;
  let fixture: ComponentFixture<CharacterListComponent>;
  let rickMortyServiceMock: jest.Mocked<RickMortyService>;

  beforeEach(async () => {
    rickMortyServiceMock = {
      getCharacters: jest.fn()
    } as unknown as jest.Mocked<RickMortyService>;
    
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: RickMortyService }
      ]
    }).compileComponents();
  });

  beforeAll(() => {
    fixture = TestBed.createComponent(CharacterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });


  test('It should load characters correctly.', () => {
    const mockResponse: any = {
      info: { pages: 5 },
      results: [{ id: 1, name: 'Rick Sanchez' }]
    };
    rickMortyServiceMock.getCharacters.mockReturnValue(of(mockResponse));
    component.loadCharacters(2);
    expect(component.loading).toBe(false);
    expect(component.error).toBe('');
    expect(component.characters).toEqual(mockResponse.results);
    expect(component.currentPage).toBe(2);
    expect(component.totalPages).toBe(5);
    expect(rickMortyServiceMock.getCharacters).toHaveBeenCalledWith(2);
  });


  test('It should handle errors when loading characters.', () => {
    const mockError = new Error('Network error');
    rickMortyServiceMock.getCharacters.mockReturnValue(throwError(() => mockError));
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    component.loadCharacters(1);
    expect(component.loading).toBe(false);
    expect(component.error).toBe('Error loading characters. Please try again.');
    expect(consoleSpy).toHaveBeenCalledWith('Error:', mockError);
    expect(rickMortyServiceMock.getCharacters).toHaveBeenCalledWith(1);
    consoleSpy.mockRestore();
  });

});