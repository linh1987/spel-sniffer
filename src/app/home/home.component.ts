import {
  Component,
  OnInit
} from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';
import { XLargeDirective } from './x-large';
import { SearchService } from '../services/search.service';
import { CollectionsService } from '../services/collections.service';
import { Site } from '../models/site';
import { Game } from '../models/game';
import { Observable } from 'rxjs/Observable';

@Component({
  /**
   * The selector is what angular internally uses
   * for `document.querySelectorAll(selector)` in our index.html
   * where, in this case, selector is the string 'home'.
   */
  selector: 'home',  // <home></home>
  /**
   * We need to tell Angular's Dependency Injection which providers are in our app.
   */
  providers: [
    Title,
    SearchService,
    CollectionsService
  ],
  /**
   * Our list of styles in our component. We may add more to compose many styles together.
   */
  styleUrls: ['./home.component.css'],
  /**
   * Every Angular template is first compiled by the browser before Angular runs it's compiler.
   */
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  /**
   * Set our default values
   */
  public sites: Observable<Site[]> = Observable.of<Site[]>([]);
  public searchTerm = { value: '' };
  public trackable: boolean = false;

  /**
   * TypeScript public modifiers
   */
  constructor(
    public appState: AppState,
    public title: Title,
    public searchService: SearchService,
    public collectionsService: CollectionsService
  ) { }

  public ngOnInit() {
  }

  public search(value: string) {
    this.searchService.search(value).then((sites) => {
      this.sites = Observable.of(sites);
      this.trackable = sites.some(s => s.games.length > 0);
    });
  }

  public track(sites: Site[]) {
    this.collectionsService.add({ keyword: this.searchTerm.value, sites });
  }
}
