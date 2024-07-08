import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderSnackbarComponent } from './loader-snackbar.component';

describe('LoaderSnackbarComponent', () => {
  let component: LoaderSnackbarComponent;
  let fixture: ComponentFixture<LoaderSnackbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderSnackbarComponent]
    });
    fixture = TestBed.createComponent(LoaderSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
