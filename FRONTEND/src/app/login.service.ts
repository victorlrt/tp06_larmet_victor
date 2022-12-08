import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl: string = environment.api;

  constructor(private http: HttpClient) {

  }

  login(login: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl+"login", {login: login, password: password});
  }
}
