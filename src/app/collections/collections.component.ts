import {
  Component,
  OnInit
} from '@angular/core';

import { CollectionsService } from '../services/collections.service';
import { Game } from '../models/game';
import { Query } from '../models/query';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'collections',
  providers: [
    CollectionsService
  ],
  styleUrls: ['./collections.component.css'],
  templateUrl: './collections.component.html'
})
export class CollectionsComponent implements OnInit {
  /**
   * Set our default values
   */
  public queries: Observable<Query[]> = Observable.of<Query[]>([]);
  public searchTerm = { value: '' };

  /**
   * TypeScript public modifiers
   */
  constructor(
    public collectionsService: CollectionsService
  ) { }

  public ngOnInit() {
    this.collectionsService.get().then((foundProducts) => {
      this.queries = Observable.of(foundProducts);
    })
  }

  // public search(value: string) {
  //   this.searchService.search(value).then((foundProducts) => {
  //     this.products = Observable.of(foundProducts);
  //   });
  // }
}
