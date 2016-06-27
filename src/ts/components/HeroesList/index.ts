import { Component, Input, Output, EventEmitter } from '@angular/core';
import Hero from '../../interfaces/hero';

@Component({
  selector: 'heroes-list',
  template: require('./template.html')
})
export default class HeroesListComponent {
  @Input() heroes: Hero[];
  @Output() navigateDetail = new EventEmitter<Hero>();

  goToDetail(hero: Hero) {
    return this.navigateDetail.emit(hero);
  }
}
