import { Injectable } from '@angular/core';
import { Deck } from '../models/deck.model';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  private myDecks: Deck[] = [];
  private readonly localStorageKey = 'myDecks';

  constructor() {
    this.loadDecksFromLocalStorage();
  }

  // Create
  addDeck(deck: Deck): void {
    this.myDecks.push(deck);
    this.saveDecksToLocalStorage();
  }

  getDecks(): Deck[] {
    return this.myDecks;
  }

  getDeckById(id: string): Deck | undefined {
    return this.myDecks.find(deck => deck.id === id);
  }

  updateDeck(updatedDeck: Deck): void {
    const index = this.myDecks.findIndex(deck => deck.id === updatedDeck.id);
    if (index !== -1) {
      this.myDecks[index] = updatedDeck;
      this.saveDecksToLocalStorage();
    }
  }

  deleteDeck(id: string): void {
    this.myDecks = this.myDecks.filter(deck => deck.id !== id);
    this.saveDecksToLocalStorage();
  }

  private saveDecksToLocalStorage(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.myDecks));
  }

  private loadDecksFromLocalStorage(): void {
    const decks = localStorage.getItem(this.localStorageKey);
    if (decks) {
      this.myDecks = JSON.parse(decks);
    }
  }
}
