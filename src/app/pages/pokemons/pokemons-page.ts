import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PokemonsList } from '../../pokemons/components/pokemons-list/pokemons-list';
import { PokemonListSkeleton } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton";
import { PokemonService } from '../../pokemons/sevices/pokemon';
import { SimplePokemon } from '../../pokemons/interfaces/simple-pokemon.interface';

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
  private pokemonService = inject(PokemonService);
  public pokemons = signal<SimplePokemon[]>([]);

  ngOnInit() {
    this.loadPokemons();
  }

  public loadPokemons(page = 0) {
    this.isLoading.set(true);
    this.pokemonService.loadPage(page).subscribe((pokemons) => {
      this.pokemons.set(pokemons);
      this.isLoading.set(false);
    });
  }

}
