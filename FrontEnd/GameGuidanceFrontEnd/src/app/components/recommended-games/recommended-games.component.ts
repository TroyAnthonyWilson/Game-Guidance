import { Component, OnInit } from '@angular/core';
import { Answer } from 'src/app/interfaces/answer';
import { Choice } from 'src/app/interfaces/choice';
import { QuestionService } from 'src/app/services/question.service';
import { Question } from '../../interfaces/question';
import { AnswerService } from 'src/app/services/answer.service';
import { Search } from 'src/app/interfaces/gameInfo';
import { FavoriteService } from 'src/app/services/favorite.service';
import { UserFavorite } from 'src/app/interfaces/user-favorite';

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
  search: Search[] = [];
  favorites: UserFavorite[] = [];
  favoritesIds: Number[] = [];
  answers!: Answer;
  isAnswered: Boolean = false;


  constructor(private questionService: QuestionService, private answerService: AnswerService, private favorite: FavoriteService) {}

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
      question.options = this.getOptionsForQuestionId(question.id);
    }
  }

  openPopup(): void {
    console.log('openPopup called');
    this.displayStyleQuestionModal = 'block';
    this.setQuestionOptions(this.questionList);
  }


  setQuestionNumber(number: Number) {
    this.currentQuestionNo === number;
  }

  openEditPopup(): void {
    console.log('openEditPopup called');
    this.displayEditResponseModal = 'block';
  }


  showNextQuestion(): void {
    console.log('showNextQuestion called');
    if (this.selectedResponse != 'None') {
      this.modalWarningText = '';
      let objIndex = this.questionList.findIndex(
        (obj) => obj.id == this.currentQuestionNo
      );
       if(this.selectedResponse != 'No Preference'){
        this.questionList[objIndex].userResponse = this.selectedResponse;
        this.questionList[objIndex].isAnswered = true;

        this.questionList[objIndex].options?.forEach((c)=>{
          if(c.apiChoiceId === Number(this.selectedResponse)){
            this.questionList[objIndex].nameOfUserChoice = c.choiceName;
          }
        });
        
       }       
        this.selectedResponse = 'None';
      if (this.questionList[objIndex + 1] != undefined) {
        this.currentQuestionNo++;
        this.displayQuestionModal = this.questionList[this.currentQuestionNo -1];
      } else {
        this.closePopup();
      }
    } else {
      this.modalWarningText = '*you didnt pick a value*';
    }

    //if any question is answered, set isAnswered to true and find games
    if(!this.isAnswered){
      this.questionList.forEach((q)=>{
        if(q.isAnswered === true){
          this.isAnswered = true;
        }
      });
    }
    if(this.isAnswered)
    {
      this.findGames();
    }
  }




  closePopup(): void {
    this.displayStyleQuestionModal = 'none';
  }

  // saveAndCloseEditResponse(thisQuestion: Question): void {
  //   console.log('saveAndCloseEditResponse called');
  //   thisQuestion.userResponse = this.selectedResponse;
  //   this.displayEditResponseModal = 'none';
  // }

  clearAllResponses(): void {
    console.log('clearAllResponses called');
    this.questionList =[];
    this.search = [];
    this.populateQuestionList();
  }



  findGames(): void {
    console.log('findGames called');
    for (let i = 0; i < this.questionList.length; i++) {
    }

    this.answers = {
      platform: Number(this.questionList[0].userResponse),
      gameMode: Number(this.questionList[1].userResponse),
      genre: Number(this.questionList[2].userResponse),
      playerPerspective: Number(this.questionList[3].userResponse),
      theme: Number(this.questionList[4].userResponse),
      //rating: Number(this.questionList[5].userResponse),
    };
    this.answerService.getGameResult(this.answers).subscribe((response: Search[]) => {
      console.log(response);
      this.search = response;
      if(this.search.length < 1){
        this.closePopup();
      }
    });
  }
}
