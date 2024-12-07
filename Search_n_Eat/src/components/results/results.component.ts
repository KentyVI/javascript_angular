import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  @Input() results: any[] = [];        // Liste des résultats de recherche
  @Input() placeDetails: any = null;   // Détails du lieu sélectionné
  @Input() placePhotos: any[] = [];    // Photos du lieu sélectionné
  @Output() selectPlace = new EventEmitter<string>();  // Événement pour sélectionner un lieu
  currentPhotoIndex: number = 0;

  // Fonction pour émettre l'ID du lieu sélectionné
  onSelectPlace(fsq_id: string) {
    this.selectPlace.emit(fsq_id);
    this.isPopupOpen = true; // Ouvrir le pop-up

  }
  previousPhoto() {
    this.currentPhotoIndex = (this.currentPhotoIndex > 0) ? this.currentPhotoIndex - 1 : this.placePhotos.length - 1;
  }

  nextPhoto() {
    this.currentPhotoIndex = (this.currentPhotoIndex < this.placePhotos.length - 1) ? this.currentPhotoIndex + 1 : 0;
  }
  isPopupOpen: boolean = false;

  closePopup() {
    this.isPopupOpen = false; // Fermer le pop-up
  }
  
  getGoogleMapsLink(address: string): string {
    // Remplacez les espaces par des "+" pour Google Maps
    console.log(address);
    const formattedAddress = address.split(' ').join('+');
    return `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`;
  }
  
}
