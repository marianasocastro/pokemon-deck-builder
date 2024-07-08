import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDeckCardComponent } from './info-deck-card.component';

describe('InfoDeckCardComponent', () => {
  let component: InfoDeckCardComponent;
  let fixture: ComponentFixture<InfoDeckCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoDeckCardComponent]
    });
    fixture = TestBed.createComponent(InfoDeckCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
