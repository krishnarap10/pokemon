import { Element } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { PokeApiService } from './poke-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'startup';
  pokemonData: any;
  pokemon: any;
  pokemonImage: any;
  pokemonsList: any = [];

  constructor(private pokeService: PokeApiService) {
  }

  get pokemonName() {
    return this.pokemonData?.types && this.pokemonData?.types[0]?.name || '';
  }

  get pokemonType() {
    return this.pokemonData?.types && this.pokemonData?.types[0]?.type?.name || '';
  }
 
  get pokemonDesc() {
    return this.pokemonData?.details?.effect_entries && this.pokemonData?.details?.effect_entries[1]?.effect || '';
  }
  ngOnInit(): void {

    this.pokeService.getAllPokemonsList().subscribe(data => {
      data.results.forEach((item: any) => {
        this.pokemonsList.push(item.name)
        return this.pokemonsList;
      });
    });


  }


  fetchPokemonDetails(pokemonName: string) {
    this.pokeService.getpokemonDetails(pokemonName).subscribe(data => {
      this.pokemonData = data;
      // this.pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${this.pokemon.id}.png`
      console.log("this.pokemonData", this.pokemonData)
    })
  }
}
