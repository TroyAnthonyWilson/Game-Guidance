import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../interfaces/question';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private httpClient: HttpClient) { }
  backendURL: string = 'https://localhost:7117/api';


  getAllQuestions = (): Observable<Question[]> => {
    return this.httpClient.get<Question[]>(this.backendURL + '/Question/GetAllQuestions');
  }

}
