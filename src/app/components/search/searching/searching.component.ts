import { Component } from '@angular/core';
import { RickMortyService } from 'src/app/services/rick-morty.service';

@Component({
  selector: 'app-searching',
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.css']
})
export class SearchingComponent {
  constructor(private readonly rickMortyService: RickMortyService) { }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    const query = input.value;
    this.rickMortyService.getCharactersByName(query).subscribe(response => {
      this.rickMortyService.setSearchResults(response.results);
    });
  }
}
