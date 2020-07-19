import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes:HeroeModel[] = [];
  cargando = false;
  constructor( private heroesServices : HeroesService) { }

  ngOnInit() {
    this.cargando = true;
    this.heroesServices.getHeroes()
    .subscribe( resp => {
      this.heroes = resp;
      this.cargando = false;
    });
  }
  borrarHeroe( heroe:HeroeModel, i:number){
    Swal.fire({
      title:'Estas seguro?',
      text:`Esta seguro que desea borrar a ${ heroe.nombre }`,
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp =>{
        if (resp.value) {
          console.log(i);
          console.log(this.heroes);
          this.heroes.slice(i,1);
          this.heroesServices.borrarHeroe(heroe.id).subscribe();   
          console.log(this.heroes);
        }
    });
  }
}
