import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../interfaces/question';
import { HttpClient } from '@angular/common/http';
import { Choice } from 'src/app/interfaces/choice';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  choices: Choice[] = [];

  constructor(private httpClient: HttpClient) {}
  backendURL: string = 'https://localhost:7117/api';

  getAllQuestions = (): Observable<Question[]> => {
    return this.httpClient.get<Question[]>(
      this.backendURL + '/Question/GetAllQuestions'
    );
  };

  getQuestionById = (questionId: number): Observable<Question> => {
    return this.httpClient.get<Question>(
      this.backendURL + '/Question/' + questionId
    );
  };

  getAllChoices = (): Observable<Choice[]> => {
    return this.httpClient.get<Choice[]>(
      this.backendURL + '/Question/GetAllChoices/'
    );
  };

  getChoicesForQuestionId = (questionId: number): Observable<Choice[]> => {
    return this.httpClient.get<Choice[]>(
      this.backendURL + '/Question/GetChoicesToQuestionId/' + questionId
    );
  };

  returnStringChoicesForQuestion = (questionId: number): string[] => {

    this.getChoicesForQuestionId(questionId).subscribe((data) => {
      this.choices = data;
      console.log(this.choices);
    });
    let names = this.choices.map((person) => person.choiceName);
    return names;
  };

}
