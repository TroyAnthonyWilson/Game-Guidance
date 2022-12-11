import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Search } from '../interfaces/search';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private baseUrl:string = "https://localhost:7117/api/Search/";

  constructor(private http: HttpClient) { }


  search = (search: any): Observable<Search[]> => {
    return this.http.get<Search[]>(`${this.baseUrl}search?search=${search.search}`);
  }
}
