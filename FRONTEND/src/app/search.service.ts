import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class SearchService {
  constructor(private http: HttpClient) {}

  search(term: string) {
    if (term === '') {
      return of([]);
    }

    return this.http.get(
      `https://api.github.com/search/users?q=${term}`
    ) /* .pipe(
        map(response => response[1])
      ) */;
  }
}