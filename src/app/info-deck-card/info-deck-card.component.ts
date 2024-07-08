import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-info-deck-card',
  templateUrl: './info-deck-card.component.html',
  styleUrls: ['./info-deck-card.component.scss']
})
export class InfoDeckCardComponent {

  @Input() id: string = '';
  @Input() deckName: string = '';
  @Input() totalCards: number = 0;
  @Input() numOfEnergyCards: number= 0;
  @Input() numOfPokemonCards: number = 0;
  @Input() numOfTrainerCards: number = 0;
  @Input() selectedTypes: string[] = [];
  @Output() deleteEvent = new EventEmitter<string>();
  @Output() editEvent = new EventEmitter<string>();
  @Output() selectDeckEvent = new EventEmitter<string>();

  onDeleteDeck() {
    this.deleteEvent.emit(this.id);
  }

  onEditDeck() {
    this.editEvent.emit(this.id);
  }

  onSelectDeck(): void {
    this.selectDeckEvent.emit(this.id);
  }
}
