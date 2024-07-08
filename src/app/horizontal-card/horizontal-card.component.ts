import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-horizontal-card',
  templateUrl: './horizontal-card.component.html',
  styleUrls: ['./horizontal-card.component.scss']
})
export class HorizontalCardComponent {

  public horizontal = true;

  @Input() name!: string;
  @Input() countInDeck!: number;
  @Input() imageSmall!: string;
  @Input() imageLarge!: string;
  @Input() isCurrentRouteMyDecks!: boolean;
  @Output() showCardDetail = new EventEmitter<string>();
  @Output() hideCardDetail = new EventEmitter<void>();
  @Output() removeFromDeck = new EventEmitter<void>();

  onShowCardDetail() {
    this.showCardDetail.emit(this.imageLarge);
  }

  onHideCardDetail() {
    this.hideCardDetail.emit();
  }

  onRemoveFromDeck() {
    this.removeFromDeck.emit();
  }

}
