import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Search } from '../interfaces/gameInfo';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private baseUrl:string = "https://localhost:7117/api/";

  constructor(private http: HttpClient) { }

  // getUsers(){
  //   return this.http.get<any>(`${this.baseUrl}`);
  // }

  UserData(tokenObj: any){
    return this.http.post<any>(`${this.baseUrl}User/UserData`, {userToken: tokenObj});
  }

  addfavorite(Id: number){
    return this.http.post<any>(`${this.baseUrl}UserFavorite/addfavorite?gameId=${Id}`, Id);
  }

  search = (search: any): Observable<Search[]> => {
    return this.http.get<Search[]>(`${this.baseUrl}UserFavorite/search?search=${search.search}`);
  }
  
}
