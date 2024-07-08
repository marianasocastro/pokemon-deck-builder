import { Component, OnInit} from '@angular/core';
import { CardsService } from 'src/app/services/cards.service';
import { Card } from '../../models/card.model'
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  cards!: Card[];
  filteredCards!: Card[];
  subtypes!: string[];
  supertypes!: string[];
  types!: string[];
  searchTerm: string = '';
  filters: { supertype: string, subtype: string, type: string } = {
    supertype: '',
    subtype: '',
    type: ''
  };
  cardToShow: string = '';
  isLoading = false;


  constructor(private cardsService: CardsService){}

  ngOnInit(): void {
    this.isLoading = true
    forkJoin({
      cards: this.cardsService.getAllCards(),
      subtypes: this.cardsService.getSubtypes(),
      supertypes: this.cardsService.getSupertypes(),
      types: this.cardsService.getTypes()
    }).subscribe({
      next: (results: any) => {
        this.cards = results.cards;
        this.filteredCards = results.cards;
        this.subtypes = results.subtypes;
        this.supertypes = results.supertypes;
        this.types = results.types;
        this.isLoading = false;


      },
      error: (error) => {
        console.error('Erro ao carregar dados:', error);
      }
    });

  }

  onSearchTermChange(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.applyFilters();
  }

  onFilterChange(filter: { filterType: string, value: string }): void {
    if (this.isValidFilterType(filter.filterType)) {
      this.filters[filter.filterType] = filter.value;
      this.applyFilters();
    }
  }

  isValidFilterType(filterType: string): filterType is 'supertype' | 'subtype' | 'type' {
    return ['supertype', 'subtype', 'type'].includes(filterType);
  }

  applyFilters(): void {
    this.filteredCards = this.cards.filter(item => {
      return (
        (!this.searchTerm || item.name.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
        (!this.filters.supertype || item.supertype === this.filters.supertype) &&
        (!this.filters.subtype || (item.subtypes ?? []).includes(this.filters.subtype)) &&
        (!this.filters.type || (item.types ?? []).includes(this.filters.type))
      );
    });
  }

  showCardDetail(image: string): void {
    this.cardToShow = image;
  }

  hideCardDetail(){
    this.cardToShow = '';
  }

}
