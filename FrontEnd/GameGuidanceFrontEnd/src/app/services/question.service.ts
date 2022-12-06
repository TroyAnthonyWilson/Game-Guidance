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

  // getQuestion = (): Observable<Question[]> => {
  //   return this.httpClient.get<Question[]>(`${this.baseURL}/PlayerPerspective/GetPlayerPerspectives`)}

  loadQuestions = (): void => {
    this.getQuestions().subscribe((data  => this.questions = data));
    console.log(this.questions)
  }
      
  getQuestions = (): Observable<Question[]> => {
    return this.httpClient.get<Question[]>(`${this.baseURL}/Question`)
  }

  changeAnswer = (id: number, answer: Answer): Observable<Answer> => {
    return this.httpClient.post<Answer>(`${this.baseURL}/Answer/ChangeAnswer` + id, answer)
  }

  loadAnswers = (): void => {
    this.getAnswers().subscribe((data  => this.answers = data));
    console.log(this.answers)
  }
      
  getAnswers = (): Observable<Answer[]> => {
    return this.httpClient.get<Answer[]>(`${this.baseURL}/Answer/GetAnswers`)
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
  
  getAllQuestions = (): Observable<Question[]> => {
    return this.httpClient.get<Question[]>(
      this.baseURL + '/Question/GetAllQuestions'
    );
  };

  getQuestionById = (questionId: number): Observable<Question> => {
    return this.httpClient.get<Question>(
      this.baseURL + '/Question/' + questionId
    );
  };

  getAllChoices = (): Observable<Choice[]> => {
    return this.httpClient.get<Choice[]>(
      this.baseURL + '/Question/GetAllChoices/'
    );
  };

  getChoicesForQuestionId = (questionId: number): Observable<Choice[]> => {
    return this.httpClient.get<Choice[]>(
      this.baseURL + '/Question/GetChoicesToQuestionId/' + questionId
    );
  };
}
