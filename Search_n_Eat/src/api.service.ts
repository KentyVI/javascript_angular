import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoursquareService {
  private apiUrl = 'https://api.foursquare.com/v3/places/search';
  private apiKey = 'fsq3Sa7cFW2mC5oSB0z4YI38fLHBNY9qJyMsvrRQaA4i2UI='; // Remplace par ta clé API

  constructor(private http: HttpClient) {}

  // Méthode de recherche des lieux
  searchPlaces(query: string, near: string): Observable<any> {
    const headers = { 'Authorization': `Bearer ${this.apiKey}` };

    const params = {
      query: query,
      near: near,
      limit: '10' // Limite le nombre de résultats
    };

    return this.http.get(this.apiUrl, { headers, params });
  }
}
