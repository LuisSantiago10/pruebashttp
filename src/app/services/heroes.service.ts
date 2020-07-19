import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HeroeModel } from "../models/heroe.model";
import { map, delay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private url = 'https://prueba-41ce8.firebaseio.com';

  constructor( private http: HttpClient) { }
  crearHerore(hereo:HeroeModel){
    return this.http.post(`${this.url}/heroes.json`,hereo).pipe(
      map((resp:any) => {
        hereo.id = resp.name
        return hereo.id;
      })
    );
  }
  actualizarHeroe(heroe:HeroeModel){
    const hereoTemp = {
      ...heroe
    };
    delete hereoTemp.id;
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`,hereoTemp);
  }
  getHeroes(){
    return this.http.get(`${this.url}/heroes.json`).pipe(
      map( this.crearArreglo ),
      delay(1500)
    );
  }
  private crearArreglo(heroesObj:object){
    const heroes: HeroeModel[] = [];
    console.log(heroesObj);

    if (heroesObj === null) { return [];}
    
    Object.keys(heroesObj).forEach( key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
      heroes.push(heroe);
    })
    return heroes;
  }
  getHeroe(id:string){
    return this.http.get(`${this.url}/heroes/${ id }.json`);
  }
  borrarHeroe( id:string){
    return this.http.delete(`${this.url}/heroes/${ id }.json`);
  }

}
