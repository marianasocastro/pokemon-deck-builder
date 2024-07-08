import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewDeckComponent } from './pages/new-deck/new-deck.component';
import { MyDecksComponent } from './pages/my-decks/my-decks.component';

const routes: Routes = [
  {path:"", component: HomeComponent},
  {path:"new-deck", component: NewDeckComponent},
  {path:"edit-deck/:id", component: NewDeckComponent},
  {path:"my-decks", component: MyDecksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
