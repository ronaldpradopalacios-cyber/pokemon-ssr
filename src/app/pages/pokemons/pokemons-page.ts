import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PokemonsList } from '../../pokemons/components/pokemons-list/pokemons-list';
import { PokemonListSkeleton } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton";

@Component({
  selector: 'app-pokemons-page',
  imports: [PokemonsList, PokemonListSkeleton],
  standalone: true,
  templateUrl: './pokemons-page.html',
  styleUrl: './pokemons-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonsPage {
  public isLoading = signal(true);

  constructor() {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1500);
  }

}
