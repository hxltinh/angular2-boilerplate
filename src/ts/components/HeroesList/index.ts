import { Component, Input } from '@angular/core';
import Hero from '../../interfaces/hero';

@Component({
  selector: 'heroes-list',
  template: require('./template.html')
})
export default class HeroesListComponent {
  @Input() heroes: Hero[];
}
