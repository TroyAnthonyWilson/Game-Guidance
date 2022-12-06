import { Component, OnInit } from '@angular/core';
import { Choice } from 'src/app/interfaces/choice';
import { GameService } from 'src/app/services/game.service';
import { QuestionService } from 'src/app/services/question.service';
import { Question } from '../../interfaces/question';

@Component({
  selector: 'app-recommended-games',
  templateUrl: './recommended-games.component.html',
  styleUrls: ['./recommended-games.component.css'],
})
export class RecommendedGamesComponent implements OnInit {
  questionList: Question[] = [];
  choicesList: Choice[] = [];
  currentQuestionNo: number = 0;
  // css variable
  displayStyleQuestionModal = 'none';
  displayEditResponseModal = 'none';
  // selected question answer
  selectedResponse = '';
  modalWarningText = '';


  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.populateQuestionList();
  }

  populateQuestionList(): void {
    this.questionService.getAllQuestions().subscribe((response) => {
      this.questionList = response;
      this.currentQuestionNo = this.questionList[0].id;
    });
  }

  getAllChoices= (): void => {
    this.questionService.getAllChoices().subscribe((response) => {
      this.choicesList = response;
    });

  }

  getOptionsForQuestionId = (questionId: number) : string[] => {
    let options: string[] = [];
    this.questionService.getChoicesForQuestionId(questionId).subscribe((data: any) => {
      this.choicesList = data;
      console.log(this.choicesList);     

      this.choicesList.forEach((c)=>{
        options.push(c.choiceName);
      });

    });
    return options;
  }

  setQuestionOptions(questionArray: Question[]): void{
    for (let i = 0; i < questionArray.length; i++) {
      const question = questionArray[i];
      question.options = this.getOptionsForQuestionId(question.id);
    }

  }

  openPopup(): void {
    this.displayStyleQuestionModal = 'block';
    this.setQuestionOptions(this.questionList);

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
        (obj) => obj.id == this.currentQuestionNo
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
      (q) => q.id === this.currentQuestionNo
    );
  }
  closePopup(): void {
    this.displayStyleQuestionModal = 'none';
  }
  saveAndCloseEditResponse(thisQuestion: Question): void {
    thisQuestion.userResponse = this.selectedResponse;
    this.displayEditResponseModal = 'none';
  }

  clearAllResponses(): void {
    this.questionList.forEach((q)=>{
      q.userResponse = '';
    });
  }

}
