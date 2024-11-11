import { Component, Output,EventEmitter } from '@angular/core';
import { FoursquareService } from '../api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})

export class FilterComponent {
  location: string = '';
  @Output() locationChange = new EventEmitter<string>();

  onLocationChange() {
    this.locationChange.emit(this.location);
  }
}

