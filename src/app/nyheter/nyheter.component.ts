import {
  Component,
  OnInit
} from '@angular/core';

import { NyheterService } from '../services/nyheter.service';
import { Game } from '../models/game';
import { Site } from '../models/site';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'nyheter',
  providers: [
    NyheterService
  ],
  styleUrls: ['./nyheter.component.css'],
  templateUrl: './nyheter.component.html'
})
export class NyheterComponent implements OnInit {
  /**
   * Set our default values
   */
  public sites: Observable<Site[]> = Observable.of<Site[]>([]);
  public searchTerm = { value: '' };

  /**
   * TypeScript public modifiers
   */
  constructor(
    public nyheterService: NyheterService
  ) { }

  public ngOnInit() {
    this.nyheterService.get().then((foundProducts) => {
      this.sites = Observable.of(foundProducts);
    })
  }

  // public search(value: string) {
  //   this.searchService.search(value).then((foundProducts) => {
  //     this.products = Observable.of(foundProducts);
  //   });
  // }
}
