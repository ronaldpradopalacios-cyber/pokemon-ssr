import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PokemonCard } from "../pokemon-card/pokemon-card";

@Component({
  selector: 'pokemons-list',
  imports: [PokemonCard],
  standalone: true,
  templateUrl: './pokemons-list.html',
  styleUrl: './pokemons-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonsList {}
