import { Component, OnInit } from '@angular/core';
import { Choice } from 'src/app/interfaces/choice';
import { QuestionService } from 'src/app/services/question.service';
import { Question } from '../../interfaces/question';

@Component({
  selector: 'app-recommended-games',
  templateUrl: './recommended-games.component.html',
  styleUrls: ['./recommended-games.component.css'],
})
export class RecommendedGamesComponent implements OnInit {
  questionList: Question[] = [];
  displayQuestionModal!: Question;


  choicesList: Choice[] = [];
  currentQuestionNo: number = 1;
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
      this.displayQuestionModal = this.questionList[0];
    });
  }

  // getAllChoices= (): void => {
  //   this.questionService.getAllChoices().subscribe((response) => {
  //     this.choicesList = response;     
  //   });
  // }

  getOptionsForQuestionId = (questionId: number) : Choice[] => {
    
    let options: Choice[] = [];
    this.questionService.getChoicesForQuestionId(questionId).subscribe((data: any) => {
      this.choicesList = data;

      this.choicesList.forEach((c)=>{
        options.push(c);
      });
    });
    return options;
  }

  setQuestionOptions(questionArray: Question[]): void{
    for (let i = 0; i < questionArray.length; i++) {
      const question = questionArray[i];
      console.log(question.id);      
      question.options = this.getOptionsForQuestionId(question.id);
    }
  }

  openPopup(): void {
    console.log('openPopup called');   
    //this.getAllChoices(); 
    this.displayStyleQuestionModal = 'block';
    this.setQuestionOptions(this.questionList);
  }

  
  setQuestionNumber(number: Number) {
    this.currentQuestionNo === number;
    console.log(this.currentQuestionNo); 
  }

  openEditPopup(): void {
    console.log('openEditPopup called');  
    //this.setQuestionNumber(this.currentQuestionNo)
    this.displayEditResponseModal = 'block';
  }


  showNextQuestion(): void {
    console.log('showNextQuestion called');   
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
      console.log(this.currentQuestionNo);
      this.currentQuestionNo++;
     
      this.displayQuestionModal = this.questionList[this.currentQuestionNo -1];
    } else {
      this.modalWarningText = '*you didnt pick a value*';
    }
  }
  
getNextQuestion(): Question[] {
  console.log('getNextQuestion called'); 
  return this.questionList.filter(
    (q) => q.id === this.currentQuestionNo
  );
}

  // getCurrentQuestion(): Question[] {
  //   console.log('getCurrentQuestion called');   
  //    for (let i = 0; i < this.choicesList.length; i++) {
  //       if(this.choicesList[i].questionId == this.currentQuestionNo)
  //       {
  //         console.log(this.choicesList[i]);       
  //       }              
  //    }  
  //   return this.questionList.filter(    
  //     (q) => q.id === this.currentQuestionNo
  //   );
  // }

  closePopup(): void {
    console.log('closePopup called');
    this.displayStyleQuestionModal = 'none';
  }

  saveAndCloseEditResponse(thisQuestion: Question): void {
    console.log('saveAndCloseEditResponse called');
    thisQuestion.userResponse = this.selectedResponse;
    this.displayEditResponseModal = 'none';
  }

  clearAllResponses(): void {
    console.log('clearAllResponses called');
    this.questionList.forEach((q)=>{
      q.userResponse = '';
    });
  }

}
