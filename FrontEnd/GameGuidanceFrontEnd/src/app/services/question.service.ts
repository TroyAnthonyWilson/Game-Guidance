import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../interfaces/question';
import { HttpClient } from '@angular/common/http';
import { Answer } from '../interfaces/answer';
import { Choice } from 'src/app/interfaces/choice';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {

  constructor(private httpClient: HttpClient) { }
  baseURL: string = 'https://localhost:7117/api';
  questions: Question[] = []
  answers: Answer[] = []

  getAllQuestions = (): Observable<Question[]> => {
    return this.httpClient.get<Question[]>(
      this.baseURL + '/Question/GetAllQuestions'
    );
  };


  getChoicesForQuestionId = (questionId: number): Observable<Choice[]> => {
    return this.httpClient.get<Choice[]>(
      this.baseURL + '/Question/GetChoicesToQuestionId/' + questionId
    );
  };
}
