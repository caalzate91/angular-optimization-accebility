import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CharacterListComponent } from './character-list.component';
import { RickMortyService, ApiResponse } from '../../services/rick-morty.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CharacterListComponent - Integration (light)', () => {
  let component: CharacterListComponent;
  let fixture: ComponentFixture<CharacterListComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CharacterListComponent],
      providers: [RickMortyService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterListComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should load and render characters and update pagination', fakeAsync(() => {
    const mockResponse: ApiResponse = {
      info: { count: 2, pages: 2, next: null, prev: null },
      results: [
        { id: 1, name: 'Rick', status: 'Alive', species: 'Human', type: '', gender: 'Male', origin: { name: 'Earth', url: '' }, location: { name: 'Earth', url: '' }, image: '', episode: [], url: '', created: '' }
      ]
    };

    // Trigger ngOnInit -> loadCharacters
    fixture.detectChanges();

    const req = httpMock.expectOne('https://rickandmortyapi.com/api/character?page=1');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    // Allow async subscription to resolve
    tick();
    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.css('.character-card'));
    expect(cards.length).toBe(1);

    const pageCurrent = fixture.debugElement.query(By.css('.page-current')).nativeElement.textContent.trim();
    expect(pageCurrent).toBe('1');
  }));

  it('should handle nextPage and previousPage calls', fakeAsync(() => {
    const firstPage: ApiResponse = {
      info: { count: 3, pages: 3, next: 'url', prev: null },
      results: [ { id: 1, name: 'Rick', status: 'Alive', species: 'Human', type: '', gender: 'Male', origin: { name: 'Earth', url: '' }, location: { name: 'Earth', url: '' }, image: '', episode: [], url: '', created: '' } ]
    };

    const secondPage: ApiResponse = {
      info: { count: 3, pages: 3, next: null, prev: 'url' },
      results: [ { id: 2, name: 'Morty', status: 'Alive', species: 'Human', type: '', gender: 'Male', origin: { name: 'Earth', url: '' }, location: { name: 'Earth', url: '' }, image: '', episode: [], url: '', created: '' } ]
    };

    fixture.detectChanges();

    // flush first page
    let req = httpMock.expectOne('https://rickandmortyapi.com/api/character?page=1');
    req.flush(firstPage);
    tick();
    fixture.detectChanges();

    // call nextPage -> should request page=2
    component.nextPage();
    fixture.detectChanges();

    req = httpMock.expectOne('https://rickandmortyapi.com/api/character?page=2');
    req.flush(secondPage);
    tick();
    fixture.detectChanges();

    let pageCurrent = fixture.debugElement.query(By.css('.page-current')).nativeElement.textContent.trim();
    expect(pageCurrent).toBe('2');

    // previousPage -> should go back to page=1
    component.previousPage();
    fixture.detectChanges();

    req = httpMock.expectOne('https://rickandmortyapi.com/api/character?page=1');
    req.flush(firstPage);
    tick();
    fixture.detectChanges();

    pageCurrent = fixture.debugElement.query(By.css('.page-current')).nativeElement.textContent.trim();
    expect(pageCurrent).toBe('1');
  }));
});
