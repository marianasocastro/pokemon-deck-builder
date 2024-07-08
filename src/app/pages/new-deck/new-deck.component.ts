import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { Card } from 'src/app/models/card.model';
import { Deck } from 'src/app/models/deck.model';
import { CardsService } from 'src/app/services/cards.service';
import { DeckService } from 'src/app/services/deck.service';

import {  IgxDialogComponent } from 'igniteui-angular';
import { IgxSnackbarComponent } from 'igniteui-angular';

@Component({
  selector: 'app-new-deck',
  templateUrl: './new-deck.component.html',
  styleUrls: ['./new-deck.component.scss']
})
export class NewDeckComponent implements OnInit{

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

  id: string = '';
  deckName: string = '';
  totalCards: number = 0;
  numOfEnergyCards: number= 0;
  numOfPokemonCards: number = 0;
  numOfTrainerCards: number = 0;
  selectedPokemonCards: Card[] = [];
  selectedTrainerCards: Card[] = [];
  selectedEnergyCards: Card[] = [];
  selectedTypes: string[] = [];
  viewMode: boolean = false;
  editMode: boolean = true;
  private deckIdToDelete: string | null = null;
  isLoading = false;

  @ViewChild('snackbar', { static: true }) public snackbar!: IgxSnackbarComponent;
  @ViewChild('dialogCancelConfirmation', { static: true }) public dialogCancelConfirmation!: IgxDialogComponent;
  @ViewChild('dialogDeleteConfirmation', { static: true }) public dialogDeleteConfirmation!: IgxDialogComponent;

  private subscriptions: Subscription = new Subscription();

  constructor(private cardsService: CardsService,
    private deckService: DeckService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.viewMode = false;
    this.editMode = true
    this.isLoading = true
    const forkJoinSub = forkJoin({
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

    this.subscriptions.add(forkJoinSub);

    const routeSub = this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.deckIdToDelete = id;
        const deck = this.deckService.getDeckById(id);
        if (deck) {
          this.id = id
          this.deckName = deck.name;
          this.totalCards = deck.totalCards;
          this.numOfEnergyCards = deck.numOfEnergyCards;
          this.numOfPokemonCards = deck.numOfPokemonCards;
          this.numOfTrainerCards = deck.numOfTrainerCards;
          this.selectedPokemonCards = deck.pokemonCards;
          this.selectedTrainerCards = deck.trainerCards;
          this.selectedEnergyCards = deck.energyCards;
          this.selectedTypes = deck.types;
          this.viewMode = true;
          this.editMode = false;
        }
      }
    });

    this.subscriptions.add(routeSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.snackbar.close();
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

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  handleDeckNameChange(newName: string): void {
    this.deckName = newName;
  }


  addCardToDeck(card: Card): void {
    if (this.totalCards >= 60) {
      this.snackbar.open(`Você só pode adicionar 60 cartas ao deck.`);
      return;
    }

    const cardName = card.name;

    switch (card.supertype) {
      case 'Pokémon':
        const pokemonCount = this.countCardInSupertype(cardName, this.selectedPokemonCards);
        if (pokemonCount >= 4) {
          this.snackbar.open(`Você não pode adicionar mais de 4 cópias da carta ${cardName} ao deck.`);
          return;
        }else if(pokemonCount > 0 && pokemonCount < 4){
          card.countInDeck = pokemonCount + 1;
          this.totalCards++;
          this.numOfPokemonCards++;
          return
        }
        card.countInDeck = pokemonCount + 1;
        this.selectedPokemonCards.push(card);
        this.numOfPokemonCards++;
        this.totalCards++;
        break;
      case 'Trainer':
        const trainerCount = this.countCardInSupertype(cardName, this.selectedTrainerCards);
        if (trainerCount >= 4) {
          this.snackbar.open(`Você não pode adicionar mais de 4 cópias da carta ${cardName} ao deck.`);
          return;
        }else if(trainerCount > 0 && trainerCount < 4){
          card.countInDeck = trainerCount + 1;
          this.totalCards++;
          this.numOfTrainerCards++;
          return
        }
        card.countInDeck = trainerCount + 1;
        this.selectedTrainerCards.push(card);
        this.numOfTrainerCards++;
        this.totalCards++;
        break;
      case 'Energy':
        const energyCount = this.countCardInSupertype(cardName, this.selectedEnergyCards);
        if (energyCount >= 4) {
          this.snackbar.open(`Você não pode adicionar mais de 4 cópias da carta ${cardName} ao deck.`);
          return;
        }else if(energyCount > 0 && energyCount < 4){
          card.countInDeck = energyCount + 1;
          this.totalCards++;
          this.numOfEnergyCards++;
          return
        }
        card.countInDeck = energyCount + 1;
        this.selectedEnergyCards.push(card);
        this.numOfEnergyCards++;
        this.totalCards++;
        break;
      default:
        break;
    }

    card.types.forEach(type => {
      if (!this.selectedTypes.includes(type)) {
        this.selectedTypes.push(type);
      }
    });
  }

  countCardInSupertype(cardName: string, supertypeArray: Card[]): number {
    const cardInDeck = supertypeArray.find(card => card.name === cardName);
    return cardInDeck ? cardInDeck.countInDeck : 0;
  }

  saveDeck() {
    if(this.totalCards < 24 || this.totalCards > 60){
      this.snackbar.open('Seu deck deve ter o mínimo de 24 e máximo de 60 cartas.');
      return;
    } else if(this.deckName === ''){
      this.snackbar.open('Você deve escolher um nome para o seu baralho.');
      return;
    } else{
      const newDeck: Deck = {
        id: this.generateId(),
        name: this.deckName,
        totalCards: this.totalCards,
        numOfPokemonCards: this.numOfPokemonCards,
        numOfTrainerCards: this.numOfTrainerCards,
        numOfEnergyCards: this.numOfEnergyCards,
        pokemonCards: this.selectedPokemonCards,
        trainerCards: this.selectedTrainerCards,
        energyCards: this.selectedEnergyCards,
        types: this.selectedTypes,
        image: '../../../assets/International_Pokémon_logo 2.png'
      };
      this.deckService.addDeck(newDeck);
      this.router.navigate(['/my-decks']);
    }
  }

  updateDeck() {
    if(this.totalCards < 24 || this.totalCards > 60){
      this.snackbar.open('Seu deck deve ter o mínimo de 24 e máximo de 60 cartas.');
      return;
    } else if(this.deckName === ''){
      this.snackbar.open('Você deve escolher um nome para o seu baralho.');
      return;
    } else{
      const updatedDeck: Deck = {
        id: this.id,
        name: this.deckName,
        totalCards: this.totalCards,
        numOfPokemonCards: this.numOfPokemonCards,
        numOfTrainerCards: this.numOfTrainerCards,
        numOfEnergyCards: this.numOfEnergyCards,
        pokemonCards: this.selectedPokemonCards,
        trainerCards: this.selectedTrainerCards,
        energyCards: this.selectedEnergyCards,
        types: this.selectedTypes,
        image: '../../../assets/International_Pokémon_logo 2.png'
      };
      this.deckService.updateDeck(updatedDeck);
      this.router.navigate(['/my-decks']);
    }
  }

  removeFromDeck(card: Card): void {
    let index = -1;

    switch (card.supertype) {
      case 'Pokémon':
        index = this.selectedPokemonCards.findIndex(c => c.id === card.id);
        if (index !== -1) {
          if (this.selectedPokemonCards[index].countInDeck > 1) {
            this.selectedPokemonCards[index].countInDeck--;
          } else {
            this.selectedPokemonCards.splice(index, 1);
          }
          this.numOfPokemonCards--;
          this.totalCards--;
        }
        break;

      case 'Trainer':
        index = this.selectedTrainerCards.findIndex(c => c.id === card.id);
        if (index !== -1) {
          if (this.selectedTrainerCards[index].countInDeck > 1) {
            this.selectedTrainerCards[index].countInDeck--;
          } else {
            this.selectedTrainerCards.splice(index, 1);
          }
          this.numOfTrainerCards--;
          this.totalCards--;
        }
        break;

      case 'Energy':
        index = this.selectedEnergyCards.findIndex(c => c.id === card.id);
        if (index !== -1) {
          if (this.selectedEnergyCards[index].countInDeck > 1) {
            this.selectedEnergyCards[index].countInDeck--;
          } else {
            this.selectedEnergyCards.splice(index, 1);
          }
          this.numOfEnergyCards--;
          this.totalCards--;
        }
        break;

      default:
        console.error(`Supertype não reconhecido: ${card.supertype}`);
        break;
    }
  }


  public close(element: any) {
    element.close();
  }

  cancel() {
    this.dialogCancelConfirmation.open();
  }

  closeCancelConfirmationDialog() {
    this.dialogCancelConfirmation.close();
  }

  goToHome(){
    this.router.navigate(['']);
  }

  deleteDeck(id: string): void {
    this.dialogDeleteConfirmation.open();
  }

  cancelDelete(): void {
    this.dialogDeleteConfirmation.close();
  }

  confirmDelete(): void {
    console.log("clicou")
    console.log("id:", this.id)
    console.log("id to delete:", this.deckIdToDelete)
    if (this.id) {
      this.deckService.deleteDeck(this.id);
      this.router.navigate(['/my-decks']);
    }
  }

}



