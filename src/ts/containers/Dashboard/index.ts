/*
*  Handle hero dashboard page
*/
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

  //dependency injection
  constructor(private router: Router ,private heroService: HeroService) {}

  //execute when component is initialized
  ngOnInit() {
    // this.heroService.getHeroes().then(res => this.heroes = res);
    this.heroService.getHeroes().subscribe(res => this.heroes = res);
  }

  goToDetail(hero: Hero) {
    const link = ['HeroDetail', { id: hero.id }];
    return this.router.navigate(link);
  }
}
