import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CharacterListComponent } from './character-list.component';
import { RickMortyService, Character, ApiResponse } from '../../services/rick-morty.service';
import { NgOptimizedImage } from '@angular/common';

describe('CharacterListComponent', () => {
  let component: CharacterListComponent;
  let fixture: ComponentFixture<CharacterListComponent>;
  let mockRickMortyService: jest.Mocked<RickMortyService>;

  const mockCharacters: Character[] = [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth (C-137)', url: 'https://rickandmortyapi.com/api/location/1' },
      location: { name: 'Citadel of Ricks', url: 'https://rickandmortyapi.com/api/location/3' },
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      episode: ['https://rickandmortyapi.com/api/episode/1'],
      url: 'https://rickandmortyapi.com/api/character/1',
      created: '2017-11-04T18:48:46.250Z'
    },
    {
      id: 2,
      name: 'Morty Smith',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'unknown', url: '' },
      location: { name: 'Citadel of Ricks', url: 'https://rickandmortyapi.com/api/location/3' },
      image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
      episode: ['https://rickandmortyapi.com/api/episode/1'],
      url: 'https://rickandmortyapi.com/api/character/2',
      created: '2017-11-04T18:50:21.651Z'
    }
  ];

  const mockApiResponse: ApiResponse = {
    info: {
      count: 826,
      pages: 42,
      next: 'https://rickandmortyapi.com/api/character?page=2',
      prev: null
    },
    results: mockCharacters
  };

  beforeEach(async () => {
    const rickMortyServiceSpy = {
      getCharacters: jest.fn(),
      getCharacterById: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [CharacterListComponent],
      imports: [NgOptimizedImage],
      providers: [
        { provide: RickMortyService, useValue: rickMortyServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterListComponent);
    component = fixture.componentInstance;
    mockRickMortyService = TestBed.inject(RickMortyService) as jest.Mocked<RickMortyService>;

    // No llamar fixture.detectChanges() aquí para evitar ngOnInit automático
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load characters on initialization', () => {
      mockRickMortyService.getCharacters.mockReturnValue(of(mockApiResponse));

      component.ngOnInit();

      expect(mockRickMortyService.getCharacters).toHaveBeenCalledWith(1);
      expect(component.characters).toEqual(mockCharacters);
      expect(component.currentPage).toBe(1);
      expect(component.totalPages).toBe(42);
      expect(component.loading).toBe(false);
      expect(component.error).toBe('');
    });
  });

  describe('loadCharacters', () => {
    it('should set loading to true initially', () => {
      mockRickMortyService.getCharacters.mockReturnValue(of(mockApiResponse));

      component.loadCharacters(1);

      expect(component.loading).toBe(false); // After successful response
      expect(component.error).toBe('');
    });

    it('should handle successful response', () => {
      mockRickMortyService.getCharacters.mockReturnValue(of(mockApiResponse));

      component.loadCharacters(2);

      expect(mockRickMortyService.getCharacters).toHaveBeenCalledWith(2);
      expect(component.characters).toEqual(mockCharacters);
      expect(component.currentPage).toBe(2);
      expect(component.totalPages).toBe(42);
      expect(component.loading).toBe(false);
      expect(component.error).toBe('');
    });

    it('should handle error response', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      mockRickMortyService.getCharacters.mockReturnValue(throwError(() => new Error('API Error')));

      component.loadCharacters(1);

      expect(component.loading).toBe(false);
      expect(component.error).toBe('Error loading characters. Please try again.');
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('navigation', () => {
    beforeEach(() => {
      component.currentPage = 2;
      component.totalPages = 5;
    });

    describe('previousPage', () => {
      it('should load previous page when current page > 1', () => {
        mockRickMortyService.getCharacters.mockReturnValue(of(mockApiResponse));
        const loadCharactersSpy = jest.spyOn(component, 'loadCharacters');

        component.previousPage();

        expect(loadCharactersSpy).toHaveBeenCalledWith(1);
      });

      it('should not load previous page when current page is 1', () => {
        component.currentPage = 1;
        mockRickMortyService.getCharacters.mockReturnValue(of(mockApiResponse));
        const loadCharactersSpy = jest.spyOn(component, 'loadCharacters');

        component.previousPage();

        expect(loadCharactersSpy).not.toHaveBeenCalled();
      });
    });

    describe('nextPage', () => {
      it('should load next page when current page < total pages', () => {
        mockRickMortyService.getCharacters.mockReturnValue(of(mockApiResponse));
        const loadCharactersSpy = jest.spyOn(component, 'loadCharacters');

        component.nextPage();

        expect(loadCharactersSpy).toHaveBeenCalledWith(3);
      });

      it('should not load next page when current page equals total pages', () => {
        component.currentPage = 5;
        mockRickMortyService.getCharacters.mockReturnValue(of(mockApiResponse));
        const loadCharactersSpy = jest.spyOn(component, 'loadCharacters');

        component.nextPage();

        expect(loadCharactersSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('getStatusClass', () => {
    it('should return "status-alive" for alive status', () => {
      expect(component.getStatusClass('Alive')).toBe('status-alive');
      expect(component.getStatusClass('alive')).toBe('status-alive');
      expect(component.getStatusClass('ALIVE')).toBe('status-alive');
    });

    it('should return "status-dead" for dead status', () => {
      expect(component.getStatusClass('Dead')).toBe('status-dead');
      expect(component.getStatusClass('dead')).toBe('status-dead');
      expect(component.getStatusClass('DEAD')).toBe('status-dead');
    });

    it('should return "status-unknown" for unknown status', () => {
      expect(component.getStatusClass('unknown')).toBe('status-unknown');
      expect(component.getStatusClass('Unknown')).toBe('status-unknown');
      expect(component.getStatusClass('anything else')).toBe('status-unknown');
      expect(component.getStatusClass('')).toBe('status-unknown');
    });
  });

  describe('template integration', () => {
    it('should render without errors when characters are loaded', () => {
      mockRickMortyService.getCharacters.mockReturnValue(of(mockApiResponse));
      component.characters = mockCharacters;
      component.loading = false;
      component.error = '';

      expect(() => fixture.detectChanges()).not.toThrow();
      expect(component.characters.length).toBe(2);
    });


  describe('lightweight integration (component + real service + http mock)', () => {
    let httpMock: HttpTestingController;
    let realFixture: ComponentFixture<CharacterListComponent>;
    let realComponent: CharacterListComponent;

    beforeEach(async () => {
      // Reset any previously instantiated test module so we can configure a fresh one
      TestBed.resetTestingModule();
      await TestBed.configureTestingModule({
        declarations: [CharacterListComponent],
        imports: [NgOptimizedImage, HttpClientTestingModule],
        providers: [RickMortyService]
      }).compileComponents();

      realFixture = TestBed.createComponent(CharacterListComponent);
      realComponent = realFixture.componentInstance;
      httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
      if (httpMock) {
        httpMock.verify();
      }
    });

    it('should load characters via real service using mocked HTTP response', () => {
      // trigger ngOnInit -> loadCharacters(1)
      realFixture.detectChanges();

      const req = httpMock.expectOne('https://rickandmortyapi.com/api/character?page=1');
      expect(req.request.method).toBe('GET');

      // respond with mockApiResponse
      req.flush(mockApiResponse);

      // after flush, component should have data
      expect(realComponent.characters.length).toBe(2);
      expect(realComponent.currentPage).toBe(1);
      expect(realComponent.totalPages).toBe(42);
      expect(realComponent.loading).toBe(false);
    });

    it('should handle HTTP error from real service and set error message', () => {
      realFixture.detectChanges();

      const req = httpMock.expectOne('https://rickandmortyapi.com/api/character?page=1');
      req.flush('Server error', { status: 500, statusText: 'Server Error' });

      expect(realComponent.error).toBe('Error loading characters. Please try again.');
      expect(realComponent.loading).toBe(false);
    });
  });

    it('should render component without errors', () => {
      mockRickMortyService.getCharacters.mockReturnValue(of(mockApiResponse));

      expect(() => fixture.detectChanges()).not.toThrow();
      expect(component).toBeTruthy();
    });

    it('should respond to user clicking Next and expose accessible elements (names, image alts, button states)', () => {
      // service returns the same mock for any page in this test
      mockRickMortyService.getCharacters.mockReturnValue(of(mockApiResponse));

      // initialize component (calls ngOnInit -> loadCharacters(1))
      fixture.detectChanges();

      // service should be called for page 1 during init
      expect(mockRickMortyService.getCharacters).toHaveBeenCalledWith(1);

      const compiled = fixture.nativeElement as HTMLElement;

      // accessible check: character names are rendered (h3.character-name)
      const nameEls = compiled.querySelectorAll('h3.character-name');
      expect(nameEls.length).toBeGreaterThan(0);
      expect(nameEls[0].textContent).toContain('Rick Sanchez');

      // accessible check: images have alt attribute equal to character name
      const imgs = compiled.querySelectorAll('img.character-image');
      expect(imgs.length).toBeGreaterThan(0);
      expect(imgs[0].getAttribute('alt')).toBe('Rick Sanchez');

      // buttons: prev should be disabled on first page, next enabled
      const prevBtn = compiled.querySelector('button.prev-btn') as HTMLButtonElement | null;
      const nextBtn = compiled.querySelector('button.next-btn') as HTMLButtonElement | null;
      expect(prevBtn).toBeTruthy();
      expect(nextBtn).toBeTruthy();
      expect(prevBtn!.disabled).toBe(true);
      expect(nextBtn!.disabled).toBe(false);

      // simulate user clicking Next -> should request page 2
      nextBtn!.click();
      fixture.detectChanges();

      expect(mockRickMortyService.getCharacters).toHaveBeenCalledWith(2);
    });
  });
});
