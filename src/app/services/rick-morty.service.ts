import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

@Injectable({
  providedIn: 'root'
})
export class RickMortyService {
  private readonly apiUrl = 'https://rickandmortyapi.com/api/character';

  private searchResultsSubject = new BehaviorSubject<any[]>([]);
  searchResults$ = this.searchResultsSubject.asObservable();

  constructor(private readonly http: HttpClient) { }

  getCharacters(page: number = 1): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}?page=${page}`);
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.apiUrl}/${id}`);
  }

  getCharactersByName(name: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/?name=${name}`);
  }

  setSearchResults(results: any[]) {
    this.searchResultsSubject.next(results);
  }
}
