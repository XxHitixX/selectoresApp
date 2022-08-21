import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from '../../services/paises.service';
import { Pais, PaisSmall } from '../../interfaces/pais.interface';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  miFormulario : FormGroup = this.fb.group({
    region  : ['', [Validators.required]],
    pais    : ['', [Validators.required]],
    limites : ['', Validators.required]
  });

  regiones : string[] = [];
  paises : PaisSmall[] = [];
  fronteras : Pais[] | null= [];
  listaBorders !: string[];

  //loading
cargando : boolean = false;

  constructor(private fb : FormBuilder,
              private paisesService : PaisesService) { }

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones

    /*
    //Cuando cambia el primer selector mi forma de hacerlo
    this.miFormulario.valueChanges
      .subscribe(
      region => {
        this.paisesService.getpaisxRegion(this.miFormulario.get('region')?.value)
        
        .subscribe(
          paises => {
            this.paises = paises

          }
        )
      }
    )*/
   
    this.miFormulario.get('region')?.valueChanges
        .pipe( 
          tap( ( _ ) =>{
            this.miFormulario.get('pais')?.reset('');
            this.cargando = true;
          }),
          switchMap(region => this.paisesService.getpaisxRegion(region))
        )
        .subscribe( paises => {
          this.cargando = false;
          this.paises = paises
        }
        )

    this.miFormulario.get('pais')?.valueChanges
          .pipe(
            tap( ( _ ) =>{
              this.miFormulario.get('limites')?.reset('');
              this.cargando = true;
            }),
            switchMap(pais => this.paisesService.getPaisPorCodigo(pais))
          )
          .subscribe(frontera => {
            this.cargando = false
            this.fronteras = frontera
          } )
          
}

guardar(){
  }

}
