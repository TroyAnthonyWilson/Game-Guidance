import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserFavorite } from '../interfaces/user-favorite';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private baseUrl:string = "https://localhost:7117/api/UserFavorite/";

  constructor(private http: HttpClient) { }

  addfavorite(Id: number){
    return this.http.post<any>(`${this.baseUrl}addfavorite?gameId=${Id}`, Id);
  } 

  removeFavorite(Id: number){
    return this.http.delete<any>(`${this.baseUrl}removefavorite?gameId=${Id}`);
  }

  //return user favorites from database
  getFavorites= (): Observable<UserFavorite[]> => {
    return this.http.get<any>(`${this.baseUrl}getfavorites`);
  }  
}
