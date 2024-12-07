import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoursquareService {
  private apiUrl = 'https://api.foursquare.com/v3/places';
  private apiKey = 'fsq3Sa7cFW2mC5oSB0z4YI38fLHBNY9qJyMsvrRQaA4i2UI=';

  constructor(private http: HttpClient) { }

  //Fonction qui nous permet de chercher un restaurant grace a une info et sa localisation
  searchPlaces(query: string, near: string): Observable<any> {
    const headers = {
      'Authorization': `${this.apiKey}`,
      'accept': `application/json`
    };

    const params = {
      query: query,
      near: near,
      limit: '10'
    };
    return this.http.get(`${this.apiUrl}/search`, { headers, params });
  }

  searchnearbyPlaces(query: string): Observable<any> {
    const headers = {
      'Authorization': `${this.apiKey}`,
      'accept': `application/json`
    };
    const params = {
      query: query,
      limit: '10'
    };
    return this.http.get(`${this.apiUrl}/nearby`, { headers, params });
  }

  searchneabybyCategories(category: string,limit : string): Observable<any> {
    const headers = {
      'Authorization': `${this.apiKey}`,
      'accept': `application/json`
    };
    const params = {
      query: category,
      limit: limit
    };
    return this.http.get(`${this.apiUrl}/nearby`, { headers, params });
  }



  searchnearbyplacesRandom(): Observable<any> {
    const headers = {
      'Authorization': `${this.apiKey}`,
      'accept': `application/json`
    };
    const params = {
      query: "restaurant",
      limit: '10'
    };
    return this.http.get(`${this.apiUrl}/nearby`, { headers, params });
  }
  //Fonction qui nous permet d'avoir les details du lieu
  getplaceDetail(fsq_id: string): Observable<any> {
    const headers = {
      'Authorization': `${this.apiKey}`,
      'accept': `application/json`
    };

    return this.http.get(`${this.apiUrl}/${fsq_id}`, { headers });
  }

  //fonction qui nous permet d'avoir les photos du lieu
  getplacePhoto(fsq_id: string): Observable<any> {
    const headers = {
      'Authorization': `${this.apiKey}`,
      'accept': `application/json`
    };

    return this.http.get(`${this.apiUrl}/${fsq_id}/photos`, { headers });
  }
}
