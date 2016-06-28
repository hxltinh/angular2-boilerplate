/*
*  Component Heroes List
*  For reuseable purpose
*/
import { Component, Input } from '@angular/core';
import Hero from '../../interfaces/hero';

@Component({
  selector: "hero-item",
  template: require('./template.html')
})
export default class HeroItem {
  // input variable from parent
  @Input() hero: Hero;
}
