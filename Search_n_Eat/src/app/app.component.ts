import { Component } from '@angular/core';
import { FoursquareService } from '../api.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { FilterComponent } from '../filter/filter.component';
import { ResultsComponent } from '../results/results.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FilterComponent,SearchBarComponent,ResultsComponent],
  templateUrl: `./app.component.html`
})
export class AppComponent {
  query: string = '';
  location: string = '';
  results: any[] = [];

  constructor(private foursquareService: FoursquareService) {}

  onSearch(query: string) {
    this.query = query;
    this.fetchResults();
  }

  onLocationChange(location: string) {''
    this.location = location;
    this.fetchResults();
  }

  fetchResults() {
    if (this.query && this.location) {
      this.foursquareService.searchPlaces(this.query, this.location).subscribe(data => {
        this.results = data.results;
      });
    }
  }
}
