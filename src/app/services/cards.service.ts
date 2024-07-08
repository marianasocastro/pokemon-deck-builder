import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from '../../app/models/card.model'
import { forkJoin, from, map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  private config: any;

  constructor(private http: HttpClient) {
    this.loadConfig();
   }

   private loadConfig(): Promise<any> {
    return this.http.get('/assets/config.json')
      .toPromise()
      .then((config: any) => {
        this.config = config;
        return config; // Retornando o config para garantir que a promessa seja resolvida corretamente
      })
      .catch((error: any) => {
        console.error('Erro ao carregar configuração:', error);
        throw error; // Lançando o erro para tratamento posterior, se necessário
      });
  }

  // getAllCards(): Observable<Card[]> {
  //   return from(this.loadConfig()).pipe(
  //     switchMap(() => this.http.get<any>(`${this.config.API_URL}/cards`)),
  //     map(response => response.data.map((item: any) => ({
  //       id: item.id,
  //       name: item.name,
  //       supertype: item.supertype,
  //       subtypes: item.subtypes,
  //       types: item.types,
  //       evolvesFrom: item.evolvesFrom,
  //       imageSmall: item.images.small,
  //       imageLarge: item.images.large
  //     })))
  //   );
  // }

  getAllCards(): Observable<Card[]> {
    return from(this.loadConfig()).pipe(
      switchMap(() => forkJoin([
        this.http.get<any>(`${this.config.API_URL}/cards?q=supertype:Pokémon`),
        this.http.get<any>(`${this.config.API_URL}/cards?q=supertype:Trainer`),
        this.http.get<any>(`${this.config.API_URL}/cards?q=supertype:Energy`)
      ])),
      map(responses => {
        const allCards = responses.flatMap(response => response.data);
        return allCards.map((item: any) => ({
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
      })
    );
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
