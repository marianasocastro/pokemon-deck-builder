import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalCardComponent } from './horizontal-card.component';

describe('HorizontalCardComponent', () => {
  let component: HorizontalCardComponent;
  let fixture: ComponentFixture<HorizontalCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HorizontalCardComponent]
    });
    fixture = TestBed.createComponent(HorizontalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
