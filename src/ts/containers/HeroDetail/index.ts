/*
*  Handle hero detail page
*/
import { Component, OnInit } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import Hero from '../../interfaces/hero';
import HeroService from '../../services/hero';
import HeroItemComponent from '../../components/HeroItem';

@Component({
  template: require('./template.html'),
  directives: [HeroItemComponent]
})
export default class HeroDetail implements OnInit {

  hero: Hero;
  
  // dependency injection
  constructor(private heroService: HeroService, private routeParams: RouteParams) {}

  //execute when component is initialized
  ngOnInit() {
    const id = +this.routeParams.get('id');
    this.heroService.getHero(id)
      .then(hero => this.hero = hero);
  }

  goBack() {
    window.history.back();
  }
}
