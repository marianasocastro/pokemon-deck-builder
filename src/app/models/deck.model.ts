import { Card } from "./card.model"

export interface Deck{
  id: string,
  name: string,
  totalCards: number,
  numOfPokemonCards: number,
  numOfTrainerCards: number,
  numOfEnergyCards: number,
  pokemonCards: Card[],
  trainerCards: Card[],
  energyCards: Card[],
  types: string[]
  image: string
}
