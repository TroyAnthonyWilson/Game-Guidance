import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from '../interfaces/answer';
import { Search } from '../interfaces/search';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'https://localhost:7117/api/Answer/FinalPost';

  getGameResult = (answerObj : Answer): Observable<Search[]> =>{
    return this.http.post<Search[]>(`${this.baseUrl}`, answerObj);
  }

}
