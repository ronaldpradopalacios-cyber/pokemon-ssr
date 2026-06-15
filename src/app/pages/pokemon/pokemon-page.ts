import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces';
import { PokemonService } from '../../pokemons/sevices/pokemon';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'pokemon-page',
  imports: [],
  standalone: true,
  templateUrl: './pokemon-page.html',
  styleUrl: './pokemon-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonPage implements OnInit{
  public pokemon = signal<Pokemon | null>(null);
  private pokemonService = inject(PokemonService);
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit() {
    // Initialization logic here
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    if(!id) return;

    this.pokemonService.loadPokemon(id)
    .pipe(
      tap( ({name, id}) => {
        const pageTitle = `#ID ${id} - ${name}`;
        const pageDescription = `Pagina Pokemon ${name}`;

        this.title.setTitle(pageTitle);
        this.meta.updateTag({ name: 'description', content: pageDescription });
        this.meta.updateTag({ name: 'og:title', content: pageTitle });
        this.meta.updateTag({ name: 'og:description', content: pageDescription });
        this.meta.updateTag({ name: 'og:image', content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png` });
      })
    )
    .subscribe(pokemon => {
      this.pokemon.set(pokemon);
    });
  }
}
