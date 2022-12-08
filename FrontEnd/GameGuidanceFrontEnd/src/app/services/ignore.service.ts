import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UserFavorite } from '../interfaces/user-favorite';

@Injectable({
  providedIn: 'root'
})
export class IgnoreService {

  private baseUrl:string = "https://localhost:7117/api/UserIgnore/";

  constructor(private http: HttpClient) { }

  addIgnore(Id: number){
    return this.http.post<any>(`${this.baseUrl}addignore?gameId=${Id}`, Id);
  } 

  // removeIgnore(Id: number){
  //   return this.http.delete<any>(`${this.baseUrl}removeignore?gameId=${Id}`);
  // }

  getIgnore= (): Observable<UserFavorite[]> => {
    return this.http.get<any>(`${this.baseUrl}getignores`);
  }  

}
