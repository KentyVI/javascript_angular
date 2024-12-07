// quote.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicateService {

  constructor() {}

  // declare and initialize the quote property
  // which will be a BehaviorSubject
  location = new BehaviorSubject("Paris");

  // expose the BehaviorSubject as an Observable
  currentLocation= this.location.asObservable();

  // function to update the value of the BehaviorSubject
  updateQuote(newLocation: string){
    this.location.next(newLocation);
  }
}