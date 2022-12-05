import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/interfaces/question';
import { Answer } from 'src/app/interfaces/answer';
import { GameService } from 'src/app/services/game.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-recommended-games',
  templateUrl: './recommended-games.component.html',
  styleUrls: ['./recommended-games.component.css'],
})
export class RecommendedGamesComponent implements OnInit {
  questionList: Question[] = [];
  currentQuestionNo: number = 1;
  // css variable
  displayStyleQuestionModal = 'none';
  displayEditResponseModal = 'none';
  // selected question answer
  selectedResponse = '';
  modalWarningText = '';
  constructor(private service: GameService, private questionService: QuestionService) {}

  ngOnInit(): void {
    this.populateQuestionList();
    this.service.gameServicePackage();
    this.questionService.loadQuestions();
  }

  openPopup(): void {
    this.displayStyleQuestionModal = 'block';
  }
  setQuestionNumber(number: Number) {
    this.currentQuestionNo === number;
  }
  openEditPopup(question: Question): void {
    this.setQuestionNumber(this.currentQuestionNo)
    this.displayEditResponseModal = 'block';
  }
  showNextQuestion(): void {
    if (this.selectedResponse != 'None') {
      // reset modal warning text
      this.modalWarningText = '';
      //Find index of specific object using findIndex method.
      let objIndex = this.questionList.findIndex(
        (obj) => obj.questionNumber == this.currentQuestionNo
      );
      //Update object's name property.
      this.questionList[objIndex].userResponse = this.selectedResponse;
      this.questionList[objIndex].isAnswered = true;
      // reset response to all
      this.selectedResponse = 'None';
      // increment to show next question
      this.currentQuestionNo++;
    } else {
      this.modalWarningText = '*you didnt pick a value*';
    }
  }
  getCurrentQuestion(): Question[] {
    return this.questionList.filter(
      (q) => q.questionNumber === this.currentQuestionNo
    );
  }
  closePopup(): void {
    this.displayStyleQuestionModal = 'none';
  }
  saveAndCloseEditResponse(thisQuestion: Question): void {
    thisQuestion.userResponse = this.selectedResponse;
    this.displayEditResponseModal = 'none';
  }

  // load dummy data
  populateQuestionList(): void {
    let newQuestion1: Question = {
      questionNumber: 1,
      userQuestion: 'What system(s)	do you want to play this game on?',
      userResponse: '',
      isAnswered: false,
      options: ['Console', 'PC', 'No Preference']
    };
    let newQuestion2: Question = {
      questionNumber: 2,
      userQuestion: 'Do you want Single or Multiplayer?',
      userResponse: '',
      isAnswered: false,
      options: this.service.gameModes.map(x => x.name) //*Issue to be addressed: Answers only populate the second time the recommended-games page is opened */
    };
    let newQuestion3: Question = {
      questionNumber: 3,
      userQuestion: 'What is your age range?',
      userResponse: '',
      isAnswered: false,
      options: ['Less than 10 years old', 'between 10 and 13', 'between 13 and 17', '17 Years old', '18+ years old']
    };
    let newQuestion4: Question = {
      questionNumber: 4,
      userQuestion: 'What Genre of game are you interested in?',
      userResponse: '',
      isAnswered: false,
      options: this.service.genres.map(x => x.name) //*Issue to be addressed: Answers only populate the second time the recommended-games page is opened */
    };
    let newQuestion5: Question = {
      questionNumber: 5,
      userQuestion: 'What perspective would you prefer in your next game?',
      userResponse: '',
      isAnswered: false,
      options: this.service.playerPerspectives.map(x => x.name) //*Issue to be addressed: Answers only populate the second time the recommended-games page is opened */
    };
    let newQuestion6: Question = {
      questionNumber: 6,
      userQuestion: 'Which of these themes appeals to you the most?',
      userResponse: '',
      isAnswered: false,
      options: this.service.themes.map(x => x.name) //*Issue to be addressed: Answers only populate the second time the recommended-games page is opened */
    };
    this.questionList = [
      newQuestion1,
      newQuestion2,
      newQuestion3,
      newQuestion4,
      newQuestion5,
      newQuestion6
    ];
  }
}
