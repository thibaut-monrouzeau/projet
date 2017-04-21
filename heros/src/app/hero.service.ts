import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Hero } from './hero';

@Injectable()
export class HeroService {
 private headers = new Headers({'Content-Type': 'application/json'});
 private heroesUrl = 'students';

 constructor(private http: Http) { }

 getHeroes(): Promise<Hero[]> {
   return this.http.get(this.heroesUrl+'.json')
              .toPromise()
              .then(response => response.json() as Hero[])
              .catch(this.handleError);
 }

 getHero(id: number): Promise<Hero> {
   const url = `${this.heroesUrl}/${id}.json`;
   return this.http.get(url)
     .toPromise()
     .then(response => response.json().data as Hero)
     .catch(this.handleError);
 }

 private handleError(error: any): Promise<any> {
   console.error('An error occurred', error); 
   return Promise.reject(error.message || error);
 }

} 