import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Answer } from '../interfaces/answer';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'https://localhost:7117/api/Answer/FinalPost';

  getGameResult(answerObj : Answer){
    return this.http.post<Answer>(`${this.baseUrl}`, answerObj);
  }

}
