import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pais, PaisSmall } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  //fields=name,cca2
  private endPoint:string = 'https://restcountries.com/v3.1/'

  private _regiones : string[] = ['Americas', 'Europe', 'Asia', 'Africa', 'Oceania'];

  get regiones(){
    return [ ...this._regiones ]
  }

  constructor(private http : HttpClient) { }

  /* Método para peticion de paises */
  getpaisxRegion(region : string):Observable<PaisSmall[]>{
    return this.http.get<PaisSmall[]>(`${this.endPoint}region/${region}?fields=name,cca2`)
  }

  //Método para buscar un pais por codigo
  getPaisPorCodigo( codigo : string):Observable<Pais[] | null>{
    //Sin esta validacion me estaba mandando un error en la API con esto se corrige
    if(!codigo){
      return of(null)
    }
    const url = `${this.endPoint}alpha/${codigo}`
    return this.http.get<Pais[]>(url)
  }
}
