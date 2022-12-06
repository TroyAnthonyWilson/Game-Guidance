import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../interfaces/question';
import { HttpClient } from '@angular/common/http';
import { Answer } from '../interfaces/answer';

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

  getAnswerProperty = (question: number, answer: Answer, response: number): void => {
    if (question === 1) {
      answer.platform === response;
    }
    if (question === 2) {
      answer.gameMode === response;
    }
    if (question === 3) {
      answer.genre === response;
    }
    if (question === 4) {
      answer.playerPerspective === response;
    }
    if (question === 5) {
      answer.theme === response;
    }
  }

}
