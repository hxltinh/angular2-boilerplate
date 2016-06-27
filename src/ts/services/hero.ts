/*
* data Model/Service
* used for request API and data transform
*/
import { Injectable } from '@angular/core';
import Heroes from '../mocks/hero';
import Hero from '../interfaces/hero';

@Injectable()
export default class HeroService {

  getHeroes() {
    return new Promise<Hero[]>(resolve =>
      setTimeout(() => resolve(Heroes), 2000)
    );
  }

  getHero(id: number) {
    return this.getHeroes()
               .then(heroes => heroes.filter(hero => hero.id === id)[0]);
  }
}
