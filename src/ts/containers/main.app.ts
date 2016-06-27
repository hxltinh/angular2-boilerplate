import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import DashboardComponent from './Dashboard';
import HeroDetailComponent from './HeroDetail';

import HeroService from '../services/hero';

@Component({
  selector: 'my-app',
  template: `
    <div>
      <p>{{title}}</p>
      <nav>
        <a [routerLink]="['Dashboard']" >Dashboard</a>
      </nav>
      <router-outlet></router-outlet>
    </div>
  `,
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS,
    HeroService
  ]
})
@RouteConfig([
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent,
    useAsDefault: true
  },
  {
    path: '/detail/:id',
    name: 'HeroDetail',
    component: HeroDetailComponent
  }

])
export class MainApp {
  title = 'Tour of Heroes';
};
