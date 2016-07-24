/*
* data Model/Service
* used for request API and data transform
*/
import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import Heroes from "../mocks/hero";
import Hero from "../interfaces/hero";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { find } from "lodash";

import "rxjs/add/operator/map";
import "rxjs/add/operator/find";
import "rxjs/add/observable/from";


@Injectable()
export default class HeroService {

  private heroesUrl = "/json/hero.json";
  constructor(private http: Http) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get(this.heroesUrl).map((res:Response) => res.json());
  }

  getHero(id: number): Observable<Hero> {
    return this.getHeroes().map((heroes:Hero[]) => {
      return find(heroes, (hero:Hero) => hero.id === id);
    });
  }
}
