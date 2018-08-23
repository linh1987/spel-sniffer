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

    game.currentPrice = this.getPrice(game);

    game.highestPrice = storedGame.highestPrice > game.currentPrice ? storedGame.highestPrice : game.currentPrice;
    game.lowestPrice = storedGame.lowestPrice < game.currentPrice && storedGame.lowestPrice > 0 ?  storedGame.lowestPrice : game.currentPrice;
    
    localStorage.setItem(game.url, JSON.stringify(game));

    return game;
  }

  track(sites: Site[]): Site[] {
    sites.forEach(site => {
      site.games = site.games.map(game => this.updatePrice(game));
    });

    return sites;
  }
}
