import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
  heroe  = new HeroeModel();

  constructor(private heroesServices:HeroesService,
              private route:ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'nuevos') {
      this.heroesServices.getHeroe(id)
      .subscribe( (resp:HeroeModel) => {
        this.heroe = resp;
        this.heroe.id = id;
      });
    }
  }
  guardar(form:NgForm){
    if (form.invalid) {
      return;
    }

    Swal.fire({
      title : 'Espere',
      text:'Guardadndo informacion',
      // type: 'info',
      allowOutsideClick:false
    });
    Swal.showLoading();

    let peticon : Observable<any>;

    if (this.heroe.id) {
      peticon = this.heroesServices.actualizarHeroe(this.heroe);
    }else{
      peticon = this.heroesServices.crearHerore(this.heroe);
    }
    peticon.subscribe( resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizo correctamente'
      })
    });
  }

}
