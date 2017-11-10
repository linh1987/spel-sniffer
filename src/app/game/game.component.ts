import {
  Component,
  OnInit,
  Input
} from '@angular/core';

import { Game } from '../models/game';

@Component({
  selector: 'game',
  providers: [
  ],
  styleUrls: ['./game.component.css'],
  templateUrl: './game.component.html'
})
export class GameComponent implements OnInit {
  @Input() game: Game;

  /**
   * TypeScript public modifiers
   */
  constructor(
  ) { 
  }

  public ngOnInit() {
  }
}
