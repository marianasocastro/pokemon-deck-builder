export interface Card{
  id: string,
  name: string,
  supertype: string,
  subtypes: string[],
  types: string[],
  evolvesFrom: string,
  imageSmall: string,
  imageLarge: string,
  countInDeck: number;
}
