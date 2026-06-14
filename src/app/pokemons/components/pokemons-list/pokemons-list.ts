import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PokemonCard } from "../pokemon-card/pokemon-card";
import { SimplePokemon } from '../../interfaces/simple-pokemon.interface';

@Component({
  selector: 'pokemons-list',
  imports: [PokemonCard],
  standalone: true,
  templateUrl: './pokemons-list.html',
  styleUrl: './pokemons-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonsList {
  public pokemons = input.required<SimplePokemon[]>();
}
