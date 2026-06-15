import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PokemonsList } from '../../pokemons/components/pokemons-list/pokemons-list';
import { PokemonListSkeleton } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton";
import { PokemonService } from '../../pokemons/sevices/pokemon';
import { SimplePokemon } from '../../pokemons/interfaces/simple-pokemon.interface';
import { ActivatedRoute, Router } from '@angular/router';

import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/internal/operators/map';
import { tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

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

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  public currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map((params) => Number(params.get('page')) ?? 1),
      map((page) => (isNaN(page) ? 1 : page)),
      map((page) => Math.max(1, page))
    )
  );

  ngOnInit() {
    console.log(this.currentPage());
    this.loadPokemons();
  }

  public loadPokemons(page = 0) {
    this.isLoading.set(true);

    const pageToLoad = this.currentPage()! + page;

    console.log(pageToLoad);

    this.pokemonService.loadPage(pageToLoad)
    .pipe(
      tap(() => {
        this.router.navigate([], {
          queryParams: { page: pageToLoad }
        });
      }),
      tap(() => {
        this.title.setTitle(`Pokemons SSR - Page ${pageToLoad}`);
      })
    )
    .subscribe((pokemons) => {
      this.pokemons.set(pokemons);
      this.isLoading.set(false);
    });
  }

}
