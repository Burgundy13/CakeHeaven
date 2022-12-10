import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Cake } from '../model/cake';
import { SlideShow } from '../model/slideshow';
import { User } from '../model/user';

const slideUrl = 'http://localhost:3000/api/slideshow';
const cakesUrl = 'http://localhost:3000/api/cakes';
const ingredientsUrl = ' http://localhost:3000/api/ingredients';
const userUrl = ' http://localhost:3000/api/user';

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
  getAllCakes(params?: any): Observable<Cake[]> {
    let options = {};
    if (params) {
      options = {
        params: new HttpParams()
          .set('sort', params.sort || '')
          .set('sortDirection', params.sortDirection || '')
          .set(
            'filter',
            (params.filter && JSON.stringify(params.filter)) || ''
          ),
      };
    }
    return this.httpClient.get(cakesUrl, options).pipe(
      map((data: any) => {
        return data && data.map((elem: any) => new Cake(elem) || []);
      })
    );
  }
  getAllIngredients(): Observable<string[]> {
    return this.httpClient.get(ingredientsUrl).pipe(
      map((data: any) => {
        return data as Array<string>;
      })
    );
  }
  getCake(id: number): Observable<Cake> {
    return this.httpClient.get(`${cakesUrl}/${id}`).pipe(
      map((data: any) => {
        return new Cake(data);
      })
    );
  }

  getUser(): Observable<User> {
    return this.httpClient.get(userUrl).pipe(
      map((data: any) => {
        return data && new User(data[0]);
      })
    );
  }
  updateUser(user: User): Observable<User> {
    return this.httpClient.put(`${userUrl}/${user._id}`, user).pipe(
      map((data: any) => {
        return new User(data);
      })
    );
  }
}
