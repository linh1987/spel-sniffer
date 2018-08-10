import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import cheerio from 'cheerio';

import { Site } from '../models/site';

const apiUrlTemplate = '/.netlify/functions/nyheter/';

@Injectable()
export class NyheterService {
    constructor(private http: Http) { }

    get() : Promise<Site[]> {
        return this.http
        .get(apiUrlTemplate)
        .map((r: Response) => r.text()).toPromise().then((responseText) => JSON.parse(responseText));
    }
}
