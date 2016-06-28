/*
*  Component Heroes List
*  For reuseable purpose
*/
import { Component, Input, Output, EventEmitter } from '@angular/core';
import Hero from '../../interfaces/hero';

@Component({
  selector: 'heroes-list',
  template: require('./template.html')
})
export default class HeroesListComponent {

  // input variable from parent
  @Input() heroes: Hero[];

  // output function from parent that will be executed
  @Output() navigateDetail = new EventEmitter<Hero>();

  // exexute parent's function
  goToDetail(hero: Hero) {
    return this.navigateDetail.emit(hero);
  }
}
