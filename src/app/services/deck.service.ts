import { Injectable } from '@angular/core';
import { Deck } from '../models/deck.model';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  private myDecks: Deck[] = [];

  constructor() { }

  // Create
  addDeck(deck: Deck): void {
    this.myDecks.push(deck);
  }

  // Read
  getDecks(): Deck[] {
    return this.myDecks;
  }

  getDeckById(id: string): Deck | undefined {
    return this.myDecks.find(deck => deck.id === id);
  }

  // Update
  updateDeck(updatedDeck: Deck): void {
    const index = this.myDecks.findIndex(deck => deck.id === updatedDeck.id);
    if (index !== -1) {
      this.myDecks[index] = updatedDeck;
    }
  }

  // Delete
  deleteDeck(id: string): void {
    this.myDecks = this.myDecks.filter(deck => deck.id !== id);
  }
}
