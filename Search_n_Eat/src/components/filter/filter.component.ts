import { Component, Output,EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})

export class FilterComponent {
  location: string = '';
  @Output() locationChange = new EventEmitter<string>();
  
  onLocationChange() {
    this.locationChange.emit(this.location);
  }


  filters = [
    { name: 'Distance'},
    { name: 'Ouvert actuellement'},
    { name: 'Avis'},
    { name: 'Prix'},
  ];

  cuisine = [
    { name: 'Chinese Restaurant', icon: 'ramen_dining' },
    { name: 'Fast Food Restaurant', icon: 'fastfood' },
    { name: 'Japanese Restaurant', icon: 'lunch_dining' },
    { name: 'Indian Restaurant', icon: 'restaurant' },
    { name: 'French Restaurant', icon: 'bakery_dining' },
    { name: 'Pizzeria', icon: 'local_pizza' },
    { name: 'Burger Joint', icon: 'restaurant_menu' },
    { name: 'Asian Restaurant', icon: 'takeout_dining' },
  ];
  
  
  
  isDropdownOpen = false;
  isDropdownOpenCuisine = false;


  // Suivi de l'état des boutons de cuisine
  activeCuisines: Set<string> = new Set();

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleDropdownCuisine() {
    this.isDropdownOpenCuisine = !this.isDropdownOpenCuisine;
  }

  @Output() cuisineChange = new EventEmitter<Set<string>>();

// Méthode modifiée pour émettre les cuisines sélectionnées
toggleCuisine(cuisineName: string) {
  if (this.activeCuisines.has(cuisineName)) {
    this.activeCuisines.delete(cuisineName);
  } else {
    this.activeCuisines.add(cuisineName);
  }
  this.cuisineChange.emit(this.activeCuisines);
}


  isCuisineActive(cuisineName: string): boolean {
    return this.activeCuisines.has(cuisineName);
  }
  
}

