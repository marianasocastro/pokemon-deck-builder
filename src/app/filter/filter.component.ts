import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  @Input() subtypes!: string[];
  @Input() supertypes!: string[];
  @Input() types!: string[];
  @Output() searchTermChange = new EventEmitter<string>();
  @Output() filterChange = new EventEmitter<{ filterType: string, value: string }>();

  public selectedFilters = [
    { text: 'Country', id: '1', icon: 'place' },
    { text: 'City', id: '2', icon: 'location_city' },
    { text: 'Address', id: '3', icon: 'home' },
    { text: 'Street', id: '4', icon: 'streetview' }
];

  onSearchTermChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTermChange.emit(inputElement.value);
  }

  onFilterChange(event: Event, filterType: string): void {
    const selectElement = event.target as HTMLSelectElement;
    this.filterChange.emit({ filterType, value: selectElement.value });
  }

}

