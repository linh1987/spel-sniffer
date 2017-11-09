import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';
import { CollectionsComponent } from './collections';
import { NyheterComponent } from './nyheter';
import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'collections', component: CollectionsComponent },
  { path: 'nyheter', component: NyheterComponent },
  { path: '**',    component: NoContentComponent },
];
