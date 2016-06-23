import { Component, OnInit } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { DashboardComponent } from './dashboard.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';

import './app.component.scss';

@Component({
  selector: 'my-app',
  template: `
    <div class="main-app">
      <h1>{{title}}</h1>
      <nav>
        <a [routerLink]="['Dashboard']">Dashboard</a>
        <a [routerLink]="['Heroes']">Heroes</a>
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
  },
  {
    path: '/heroes',
    name: 'Heroes',
    component: HeroesComponent
  }
])

export class AppComponent {
  title = 'Tour of Heroes';
};
