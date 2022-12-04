import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../interfaces/question';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private httpClient: HttpClient) { }
  baseURL: string = 'https://localhost:7117/api';
  questions: Question[] = []
  // getQuestion = (): Observable<Question[]> => {
  //   return this.httpClient.get<Question[]>(`${this.baseURL}/PlayerPerspective/GetPlayerPerspectives`)}

  loadQuestions = (): void => {
    this.getQuestions().subscribe((data  => this.questions = data));
    console.log(this.questions)
  }
      
  getQuestions = (): Observable<Question[]> => {
    return this.httpClient.get<Question[]>(`${this.baseURL}/Question`)
  }
}
