import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/interfaces/question';

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
  constructor() {}

  ngOnInit(): void {
    this.populateQuestionList();
  }

  openPopup(): void {
    this.displayStyleQuestionModal = 'block';
  }
  openEditPopup(): void {
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
      userResponse: 'option1',
      isAnswered: false,
    };
    let newQuestion2: Question = {
      questionNumber: 2,
      userQuestion: 'Do you want Single or Multiplayer?',
      userResponse: '',
      isAnswered: false,
    };
    let newQuestion3: Question = {
      questionNumber: 3,
      userQuestion: 'How old are you?',
      userResponse: '',
      isAnswered: false,
    };
    let newQuestion4: Question = {
      questionNumber: 4,
      userQuestion: 'What Genre of game are you interested in?',
      userResponse: '',
      isAnswered: false,
    };
    this.questionList = [
      newQuestion1,
      newQuestion2,
      newQuestion3,
      newQuestion4,
    ];
  }
}
