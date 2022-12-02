import { HttpClient, HttpHandler, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  addfavorite(favorite: any){
    return this.http.post<any>(`${this.baseUrl}UserFavorite/addfavorite`, favorite);
  }

}
