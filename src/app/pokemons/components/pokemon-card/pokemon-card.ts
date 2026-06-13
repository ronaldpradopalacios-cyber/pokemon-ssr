import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pokemon-card',
  imports: [],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCard {}
