import { Injectable } from "@angular/core";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/toPromise";

import { Site } from "../models/site";
import { Game } from "../models/game";

@Injectable()
export class PriceTrackingService {
  constructor() {}
  getPrice(game: Game): number {
    return Number(game.price.split(" ")[0]);
  }

  updatePrice(game: Game): Game {
    let storedData = localStorage.getItem(game.url);
    if (!storedData) {
      storedData = JSON.stringify(game);
      localStorage.setItem(game.url, storedData);
    }

    let storedGame: Game = JSON.parse(storedData);

    if (!storedGame.highestPrice) {
      storedGame.highestPrice = this.getPrice(game);
    } else if (storedGame.highestPrice < this.getPrice(game)) {
      storedGame.highestPrice = this.getPrice(game);
    }

    if (
      !storedGame.lowestPrice ||
      storedGame.lowestPrice > this.getPrice(game)
    ) {
      storedGame.lowestPrice = this.getPrice(game);
    }

    localStorage.setItem(game.url, JSON.stringify(storedGame));

    return storedGame;
  }

  track(sites: Site[]): Site[] {
    sites.forEach(site => {
      site.games = site.games.map(game => this.updatePrice(game));
    });

    return sites;
  }
}
