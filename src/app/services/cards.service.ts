import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from '../../app/models/card.model';
import { forkJoin, from, map, Observable, of, shareReplay, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  private config: any;
  private cache: Card[] = [];
  private cacheObservable!: Observable<Card[]> | null;
  private readonly localStorageKey = 'allCards';

  constructor(private http: HttpClient) {
    this.loadConfig();
    this.loadCardsFromLocalStorage();
  }

  private loadConfig(): Promise<any> {
    return this.http.get('/assets/config.json')
      .toPromise()
      .then((config: any) => {
        this.config = config;
        return config;
      })
      .catch((error: any) => {
        console.error('Erro ao carregar configuração:', error);
        throw error;
      });
  }

  getAllCards(): Observable<Card[]> {
    if (this.cache.length > 0) {
      return of(this.cache);
    }
    if (this.cacheObservable) {
      return this.cacheObservable;
    }
    this.cacheObservable = from(this.loadConfig()).pipe(
      switchMap(() => forkJoin([
        this.http.get<any>(`${this.config.API_URL}/cards?q=supertype:Pokémon`),
        this.http.get<any>(`${this.config.API_URL}/cards?q=supertype:Trainer`),
        this.http.get<any>(`${this.config.API_URL}/cards?q=supertype:Energy`)
      ])),
      map(responses => {
        const allCards = responses.flatMap(response => response.data);
        this.cache = allCards.map((item: any) => ({
          id: item.id,
          name: item.name,
          supertype: item.supertype,
          subtypes: item.subtypes,
          types: item.types,
          evolvesFrom: item.evolvesFrom,
          imageSmall: item.images.small,
          imageLarge: item.images.large,
          countInDeck: 0
        }));
        this.saveCardsToLocalStorage();
        this.cacheObservable = null;
        return this.cache;
      }),
      shareReplay(1)
    );
    return this.cacheObservable;
  }

  private saveCardsToLocalStorage(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cache));
  }

  private loadCardsFromLocalStorage(): void {
    const cards = localStorage.getItem(this.localStorageKey);
    if (cards) {
      this.cache = JSON.parse(cards);
    }
  }

  getSupertypes(): Observable<string[]> {
    return from(this.loadConfig()).pipe(
      switchMap(() =>
        this.http.get<any>(`${this.config.API_URL}/supertypes`).pipe(
          map(response => response.data as string[])
        )
      )
    );
  }

  getSubtypes(): Observable<string[]> {
    return from(this.loadConfig()).pipe(
      switchMap(() =>
        this.http.get<any>(`${this.config.API_URL}/subtypes`).pipe(
          map(response => response.data as string[])
        )
      )
    );
  }

  getTypes(): Observable<string[]> {
    return from(this.loadConfig()).pipe(
      switchMap(() =>
        this.http.get<any>(`${this.config.API_URL}/types`).pipe(
          map(response => response.data as string[])
        )
      )
    );
  }
}
