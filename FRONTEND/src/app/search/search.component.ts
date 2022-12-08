import { Component, ViewChild, ElementRef } from '@angular/core';
import { Observable, fromEvent, of } from 'rxjs';
import { SearchService } from '../search.service';
import {
  map,
  distinctUntilChanged,
  debounceTime,
  switchMap,
  catchError,
} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  model!: Observable<any>;
  searchField$!: Observable<any>;
  @ViewChild('input', { static: true }) input!: ElementRef;

  constructor(private _service: SearchService) {}

  ngAfterViewInit() {
    this.searchField$ = fromEvent(this.input.nativeElement, `keyup`);
    this.model = this.searchField$.pipe(
      map((event) => event.target.value),
      debounceTime(300),
      distinctUntilChanged(),

      switchMap((term) =>
        this._service.search(term).pipe(
          catchError(() => {
            return of([]);
          })
        )
      )
    );
  }
}
