import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '../models/card.model';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  cardToShow: string = '';
  @Input() id: string | undefined = '';
  @Input() deckName: string | undefined = '';
  @Input() totalCards: number |undefined = 0;
  @Input() numOfEnergyCards: number | undefined = 0;
  @Input() numOfPokemonCards: number | undefined = 0;
  @Input() numOfTrainerCards: number | undefined= 0;
  @Input() selectedPokemonCards!: Card[] | undefined;
  @Input() selectedTrainerCards!: Card[] | undefined;
  @Input() selectedEnergyCards!: Card[] | undefined;
  @Input() selectedTypes!: string[] | undefined;
  @Input() viewMode: boolean = false;
  @Input() editMode: boolean = false;
  @Output() removeFromDeckEvent = new EventEmitter<Card>();
  @Output() cancelEvent = new EventEmitter<void>();
  @Output() saveEvent = new EventEmitter<void>();
  @Output() deleteEvent = new EventEmitter<string>();
  @Output() editEvent = new EventEmitter<string>();
  @Output() deckNameChange = new EventEmitter<string>();


  constructor(
    private route: ActivatedRoute,
  ){}


  isCurrentRouteMyDecks(): boolean {
    return this.route.snapshot.url.some(segment => segment.path === 'my-decks');
  }

  onDeckNameChange(newName: string): void {
    this.deckNameChange.emit(newName);
  }

  onCancel() {
    this.cancelEvent.emit();
  }

  onSaveDeck() {
    this.saveEvent.emit();
  }

  onDeleteDeck() {
    this.deleteEvent.emit(this.id);
  }

  onEditDeck() {
    this.editEvent.emit(this.id);
  }

  removeFromDeck(card: Card){
    this.removeFromDeckEvent.emit(card)
  }

  showCardDetail(image: string): void {
    this.cardToShow = image;
  }

  hideCardDetail(){
    this.cardToShow = '';
  }


}
