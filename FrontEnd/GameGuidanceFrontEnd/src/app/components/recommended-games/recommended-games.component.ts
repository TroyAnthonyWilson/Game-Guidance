import { Component, OnInit, ValueSansProvider } from '@angular/core';
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
      // console.log(question.id);
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
    // console.log(this.currentQuestionNo);
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
        // check if question has next index
      if (this.questionList[objIndex + 1] != undefined) {
        // console.log('next question exists');
        this.currentQuestionNo++;
        this.displayQuestionModal = this.questionList[this.currentQuestionNo -1];
      } else {
        // console.log('next question does not exist');
        this.closePopup();
      }
    } else {
      this.modalWarningText = '*you didnt pick a value*';
    }
  }




  closePopup(): void {
    // console.log('closePopup called');
    this.displayStyleQuestionModal = 'none';
  }

  // saveAndCloseEditResponse(thisQuestion: Question): void {
  //   console.log('saveAndCloseEditResponse called');
  //   thisQuestion.userResponse = this.selectedResponse;
  //   this.displayEditResponseModal = 'none';
  // }

  clearAllResponses(): void {
    console.log('clearAllResponses called');
    this.questionList.forEach((q)=>{
      q.userResponse = '';
    });
  }



  //find games based on user responses
  findGames(): void {
    console.log('findGames called');
    for (let i = 0; i < this.questionList.length; i++) {
      const question = this.questionList[i];
      // console.log(question.userResponse, question.id);
    }

    this.answers = {
      platform: Number(this.questionList[0].userResponse),
      gameMode: Number(this.questionList[1].userResponse),
      playerPerspective: Number(this.questionList[2].userResponse),
      genre: Number(this.questionList[3].userResponse),
      theme: Number(this.questionList[4].userResponse),
      //rating: Number(this.questionList[5].userResponse),
    };
    


    this.answerService.getGameResult(this.answers).subscribe((response: Search[]) => {
      console.log(response);
      this.search = response;
      this.getFavorites();
    });
    // console.log(this.answers);

  }

  getFavorites = () : void => {
    this.favorite.getFavorites().subscribe((data: any) => {
      this.favorites = data;
      this.getFavoritesIds();
    });
  }

  getFavoritesIds = () => {
    let ids: Number[] = [];
    this.favorites.forEach((fav) => {
      ids.push(fav.gameId);
    });
    //console.log("ids: " + ids);
    
    this.favoritesIds = ids;
    //console.log("favoritesIds: " + this.favoritesIds);   
  };

  // add to favorites
addToFavorites(id: number){
  console.log("Add to favorites: " + id);
  this.favorite.addfavorite(id).subscribe((data: any) => {
    //console.log(data);
    this.getFavorites();
  }); 
  };

  // remove from favorites
removeFromFavorites(id: number){
  console.log("Remove from favorites: " + id);
  this.favorite.removeFavorite(id).subscribe((data: any) => {
    //console.log(data);
    this.getFavorites();
  }); 
  }
}
