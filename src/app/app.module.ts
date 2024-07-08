import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { NewDeckComponent } from './pages/new-deck/new-deck.component';
import { FilterComponent } from './filter/filter.component';
import { CardsService } from './services/cards.service';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MyDecksComponent } from './pages/my-decks/my-decks.component';
import { InfoDeckCardComponent } from './info-deck-card/info-deck-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IgxSnackbarModule } from 'igniteui-angular';
import { IgxDialogModule, IgxCardModule } from 'igniteui-angular';
import { HorizontalCardComponent } from './horizontal-card/horizontal-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    NewDeckComponent,
    FilterComponent,
    SidebarComponent,
    MyDecksComponent,
    InfoDeckCardComponent,
    HorizontalCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    IgxSnackbarModule,
    IgxDialogModule,
    IgxCardModule
  ],
  providers: [CardsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
