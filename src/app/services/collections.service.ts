import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import cheerio from 'cheerio';

import { Query } from '../models/query';

const apiUrlTemplate = '/collections/query';

@Injectable()
export class CollectionsService {
    constructor(private http: Http) { }

    get() : Promise<Query[]> {
        return this.http
        .get(apiUrlTemplate)
        .map((r: Response) => r.text()).toPromise().then((responseText) => JSON.parse(responseText));
    }

    add(query: Query) : Promise<boolean> {
        return this.http.post(apiUrlTemplate, query)
                .map((r: Response) => r.status === 200 ? true: false).toPromise();
    }
}
