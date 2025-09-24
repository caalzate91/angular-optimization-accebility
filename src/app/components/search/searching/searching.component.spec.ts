import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchingComponent } from './searching.component';
import { RickMortyService } from 'src/app/services/rick-morty.service';
import { of } from 'rxjs';

describe('SearchingComponent', () => {
  let component: SearchingComponent;
  let fixture: ComponentFixture<SearchingComponent>;
  let mockService: any;

  beforeEach(() => {
    mockService = {
      getCharactersByName: jest.fn().mockReturnValue(of({ results: [] })),
      setSearchResults: jest.fn()
    };

    TestBed.configureTestingModule({
      declarations: [SearchingComponent],
      providers: [{ provide: RickMortyService, useValue: mockService }]
    });

    fixture = TestBed.createComponent(SearchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service on search', () => {
    const event = { target: { value: 'Rick' } } as any;
    component.onSearch(event);
    expect(mockService.getCharactersByName).toHaveBeenCalledWith('Rick');
    expect(mockService.setSearchResults).toHaveBeenCalled();
  });

  it('should bind input event to onSearch', () => {
    const input = fixture.nativeElement.querySelector('.search-input');
    input.value = 'Morty';
    input.dispatchEvent(new Event('input'));
    expect(mockService.getCharactersByName).toHaveBeenCalledWith('Morty');
  });
});
