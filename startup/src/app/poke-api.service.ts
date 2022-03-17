import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { concatMap, map, mergeMap, switchMap, tap, } from 'rxjs/operators';
import { forkJoin, zip } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class PokeApiService {
  private httpOptions: object = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getPokemonurl: string = 'https://pokeapi.co/api/v2/pokemon/';
  getPokemonsList = 'https://pokeapi.co/api/v2/pokemon/?offset=100&limit=100'
  getPokemonDetails = 'https://pokeapi.co/api/v2/ability/'

  constructor(private http: HttpClient) { }
  getAllPokemonsList() {
    return this.http.get<any>(this.getPokemonsList)
  }

  getpokemonDetails(pokemonName: string, id?: string) {
    // return this.http.get<any>(this.getPokemonurl + pokemonName);

    return this.http.get<any>(this.getPokemonurl + pokemonName).pipe(
      tap(data => console.log("tap=>", data)),
      switchMap(item => {
        return this.http.get<any>(this.getPokemonDetails + item.id).pipe(
          map(details => ({
            ...item,
            details: details
          }))
        );
      }),
      tap(data => console.log("switchMap=>", data)),
    )
  }
}