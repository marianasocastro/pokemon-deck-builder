import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IgxDialogComponent, IgxSnackbarComponent } from 'igniteui-angular';
import { Deck } from 'src/app/models/deck.model';
import { DeckService } from 'src/app/services/deck.service';

@Component({
  selector: 'app-my-decks',
  templateUrl: './my-decks.component.html',
  styleUrls: ['./my-decks.component.scss']
})
export class MyDecksComponent implements OnInit {

  myDecks: Deck[] = [];
  selectedDeck: Deck | undefined = {
    id: '',
    name: '',
    totalCards: 0,
    numOfPokemonCards: 0,
    numOfTrainerCards: 0,
    numOfEnergyCards: 0,
    pokemonCards: [],
    trainerCards: [],
    energyCards: [],
    types: [],
    image: ''
  };
  private deckIdToDelete: string = '';
  viewMode: boolean = false;
  @ViewChild('snackbar', { static: true }) public snackbar!: IgxSnackbarComponent;
  @ViewChild('dialogDeleteConfirmation', { static: true }) public dialogDeleteConfirmation!: IgxDialogComponent;

  constructor(
    private deckService: DeckService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.myDecks = this.deckService.getDecks();
    if(this.myDecks.length > 0){
      this.viewMode = true
    }
  }

  editDeck(id: string): void {
    this.router.navigate(['/edit-deck', id]);
  }

  // deleteDeck(id: string): void {
  //   const confirmation = window.confirm('Você tem certeza que deseja excluir este baralho?');
  //   if (confirmation) {
  //     this.deckService.deleteDeck(id);
  //     // this.myDecks = this.deckService.getDecks();
  //     this.selectedDeck = {
  //       id: '',
  //       name: '',
  //       totalCards: 0,
  //       numOfPokemonCards: 0,
  //       numOfTrainerCards: 0,
  //       numOfEnergyCards: 0,
  //       pokemonCards: [],
  //       trainerCards: [],
  //       energyCards: [],
  //       types: [],
  //       image:''
  //     };
  //     this.snackbar.open(`Baralho excluído com sucesso!`);
  //     this.myDecks = this.deckService.getDecks();
  //     if(this.myDecks.length <= 0){
  //       this.viewMode = false;
  //     }
  //   }
  // }

  deleteDeck(id: string): void {
    this.deckIdToDelete = id;
    this.dialogDeleteConfirmation.open();
  }

  cancelDelete(): void {
    this.deckIdToDelete = '';
    this.dialogDeleteConfirmation.close();
  }

  confirmDelete(): void {
    this.deckService.deleteDeck(this.deckIdToDelete);
    // this.myDecks = this.deckService.getDecks();
    this.selectedDeck = {
      id: '',
      name: '',
      totalCards: 0,
      numOfPokemonCards: 0,
      numOfTrainerCards: 0,
      numOfEnergyCards: 0,
      pokemonCards: [],
      trainerCards: [],
      energyCards: [],
      types: [],
      image:''
    };
    this.snackbar.open(`Baralho excluído com sucesso!`);
    this.myDecks = this.deckService.getDecks();
    if(this.myDecks.length <= 0){
      this.viewMode = false;
    }
    this.dialogDeleteConfirmation.close();
  }



  handleSelectedDeck(id: string): void {
    this.selectedDeck = this.myDecks.find(deck => deck.id === id);
    this.viewMode = true;
  }

  public close(element: any) {
    element.close();
  }



}
