import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import Hero from '../../interfaces/hero';
import HeroService from '../../services/hero';

import HeroListComponent from '../../components/HeroesList';

@Component({
  selector: 'c-dashboard',
  template: require('./template.html'),
  directives: [HeroListComponent]
})
export default class DashboardComponent {

  heroes: Hero[] = [];

  constructor(private router: Router ,private heroService: HeroService) {}

 ngOnInit() {
   this.heroService.getHeroes().then(res => this.heroes = res);
 }

 goToDetail(hero: Hero) {
   const link = ['heroDetail', { id: hero.id }];
   this.router.navigate(link);
 }
}
