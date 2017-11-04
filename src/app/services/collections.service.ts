import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import cheerio from 'cheerio';

import { Game } from '../models/game';

const apiUrlTemplate = 'http://localhost:3001/collections/';

@Injectable()
export class CollectionsService {
    constructor(private http: Http) { }

    get() : Promise<Game[]> {
        return this.http
        .get(apiUrlTemplate)
        .map((r: Response) => r.text()).toPromise().then((responseText) => JSON.parse(responseText));
    }

    add(game: Game) : Promise<boolean> {
        return this.http.post(apiUrlTemplate, game)
                .map((r: Response) => r.status === 200 ? true: false).toPromise();
    }
}
