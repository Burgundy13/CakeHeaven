import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SlideShow } from '../model/slideshow';

const slideUrl = 'http://localhost:3000/api/slideshow';

@Injectable({
  providedIn: 'root',
})
export class CakesService {
  constructor(private httpClient: HttpClient) {}

  getSlideInfo(): Observable<SlideShow[]> {
    return this.httpClient.get(slideUrl).pipe(
      map((data: any) => {
        return data && data.map((elem: any) => new SlideShow(elem) || []);
      })
    );
  }
}
