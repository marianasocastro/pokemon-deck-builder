import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDecksComponent } from './my-decks.component';

describe('MyDecksComponent', () => {
  let component: MyDecksComponent;
  let fixture: ComponentFixture<MyDecksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyDecksComponent]
    });
    fixture = TestBed.createComponent(MyDecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
