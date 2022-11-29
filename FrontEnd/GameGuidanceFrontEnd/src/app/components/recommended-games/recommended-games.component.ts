import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Question } from 'src/app/interfaces/question';

@Component({
  selector: 'app-recommended-games',
  templateUrl: './recommended-games.component.html',
  styleUrls: ['./recommended-games.component.css']
})
export class RecommendedGamesComponent implements OnInit {
  questionList : Question[] =  [];
  currentQuestionNo: number = 1;
  currQuestion = this.questionList.find(q => q.questionNumber === this.currentQuestionNo);
  // css variable
  displayStyle = "none";
  // selected question answer
  selectedResponse = "";
  constructor() { }

  ngOnInit(): void {
    this.populateQuestionList();
  }


  openPopup(): void {
    this.displayStyle = "block";
  }
  showNextQuestion(): void {
    let currentQuestion = this.questionList.find(q => q.questionNumber === this.currentQuestionNo);
    // store all values and save
    currentQuestion = {
      questionNumber: currentQuestion?.questionNumber,
      userQuestion: currentQuestion?.userQuestion,
      userResponse: this.selectedResponse
    };
    console.log(currentQuestion);

    // increment to show next question
    this.currentQuestionNo++;
  }
  getCurrentQuestion(): Question[]{
    return this.questionList.filter(q => q.questionNumber === this.currentQuestionNo);
  }
  closePopup(): void {
    this.displayStyle = "none";
  }

  populateQuestionList(): void{

    let newQuestion1: Question = {
      questionNumber: 1,
      userQuestion: "What system(s)	do you want to play this game on?",
      userResponse: "option1"

    };
    let newQuestion2: Question = {
      questionNumber: 2,
      userQuestion: "Do you want Single or Multiplayer?",
      userResponse: ""
    };
    let newQuestion3: Question = {
      questionNumber: 3,
      userQuestion: "How old are you?",
      userResponse: ""
    };
    let newQuestion4: Question = {
      questionNumber: 4,
      userQuestion: "What Genre of game are you interested in?",
      userResponse: ""
    };
    this.questionList = [newQuestion1, newQuestion2, newQuestion3, newQuestion4];
  }

}
