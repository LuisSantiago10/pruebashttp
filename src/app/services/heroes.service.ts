import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HeroeModel } from "../models/heroe.model";
import { map } from "rxjs/operators";

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
}
