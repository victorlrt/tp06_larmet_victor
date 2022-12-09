import { Injectable } from '@angular/core';
import { distinct, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Mushroom } from '../core/model/mushroom';
import { map } from 'rxjs/internal/operators/map';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  constructor(private http: HttpClient) { }
  env = environment;
  apiUrl: string = environment.api;

  listProducts: Mushroom[] = [];

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getCatalogue(): Observable<Mushroom[]> {
    return this.http.get<Mushroom[]>(this.env.catalogue);
  }

  getCatalogueDistinctTypeToxicity(): Observable<String[]> {
    return this.http.get<Mushroom[]>(this.env.catalogue).pipe(map(
      (listProducts: Mushroom[]) => listProducts.map(
        (mushroom: Mushroom) => mushroom.toxicity).filter(
          (value, index, self) => self.indexOf(value) === index)));
  }

  search(search: string): Observable<Mushroom[]> {
    if(search === ''){
      return this.getCatalogue();
    }
    return this.http.get<Mushroom[]>(this.apiUrl+"catalogue/"+search, this.httpOptions)
  }


}
