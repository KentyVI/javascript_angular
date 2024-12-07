import { Component } from '@angular/core';
import { FoursquareService } from '../services/api.service';
import { SearchBarComponent } from '../components/search-bar/search-bar.component';
import { FilterComponent } from '../components/filter/filter.component';
import { ResultsComponent } from '../components/results/results.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FilterComponent, SearchBarComponent, ResultsComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  query: string = '';
  location: string = '';
  results: any[] = [];
  placeDetails: any = null;  // Détails du lieu sélectionné
  placePhotos: any[] = [];   // Photos du lieu sélectionné
  selectedCuisines: Set<string> = new Set();


  constructor(private foursquareService: FoursquareService) {}

  // Fonction pour déclencher la recherche
  onSearch(query: string) {
    this.query = query;
    this.fetchResults();
  }

  // Fonction pour changer la localisation
  onLocationChange(location: string) {
    this.location = location;
    this.fetchResults();
  }

  // Fonction pour obtenir les résultats de recherche
  fetchResults() {

    if (this.query && this.location) {
      this.foursquareService.searchPlaces(this.query, this.location).subscribe(data => {
        this.results = data.results;  // Assurez-vous que la structure correspond à l'API
      });
    }
    else if (this.query)
    {
      this.foursquareService.searchnearbyPlaces(this.query).subscribe(data => {
        this.results = data.results;
      }) 
    }
    else if (this.selectedCuisines.size && this.location)
    {
      const cuisinesArray = Array.from(this.selectedCuisines).join(',');

      this.foursquareService.searchPlaces(cuisinesArray, this.location).subscribe(data => {
        this.results = data.results;  // Assurez-vous que la structure correspond à l'API
      });
    }
    else if (this.selectedCuisines.size)
    {
      this.fetchRestaurantsByCuisine();
    }
    else if (this.location)
    {
      console.log("ici");
      this.foursquareService.searchnearbyPlaces( this.location).subscribe(data => {
        this.results = data.results;  // Assurez-vous que la structure correspond à l'API
      });
      
    }
    else
    {
      this.foursquareService.searchnearbyplacesRandom().subscribe(data => {
        this.results = data.results;
      }) 
    }
  }

  onCuisineChange(cuisines: Set<string>) {
    this.selectedCuisines = cuisines;
    this.fetchRestaurantsByCuisine();
  }

  fetchRestaurantsByCuisine() {
    if (this.selectedCuisines.size > 0) {
      const cuisinesArray = Array.from(this.selectedCuisines).join(',');
      if (this.location)
      {
        this.foursquareService.searchPlaces(cuisinesArray, this.location).subscribe(data => {
          this.results = data.results;  // Assurez-vous que la structure correspond à l'API
        });
      }
      else
      {
      var limit = this.selectedCuisines.size*10;
      this.foursquareService.searchneabybyCategories(cuisinesArray,limit.toString()) // Remplacez 'Paris' par une variable dynamique si besoin
        .subscribe(
          (response) => {
            this.results = response.results;
          },
          (error) => {
            console.error('Erreur lors de la recherche des restaurants :', error);
          }
        );
      }
    }
  }
  // Fonction pour sélectionner un lieu et obtenir ses détails et photos
  onSelectPlace(fsq_id: string) {
    this.foursquareService.getplaceDetail(fsq_id).subscribe(detail => {
      this.placeDetails = detail;  
    });
    this.foursquareService.getplacePhoto(fsq_id).subscribe(photos => {
      this.placePhotos = photos;   
      });
  }
}
