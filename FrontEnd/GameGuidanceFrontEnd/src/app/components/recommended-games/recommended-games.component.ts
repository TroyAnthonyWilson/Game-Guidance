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
    this.getAllChoices();
    this.getOptionsForQuestionId(1);
    // console.log(this.choicesList);


    // this.service.gameServicePackage();
  }

  populateQuestionList(): void {
    this.questionService.getAllQuestions().subscribe((response) => {
      this.questionList = response;
      // console.log(this.questionList);

    });
  }

  getAllChoices= (): void => {
    this.questionService.getAllChoices().subscribe((response) => {
      this.choicesList = response;
      // console.log(this.choicesList);
    });

  }

  getOptionsForQuestionId = (questionId: number) : string[] => {
    let options: string[] = [];
    this.questionService.getChoicesForQuestionId(questionId).subscribe((data: any) => {
      this.choicesList = data;
      this.choicesList.forEach((c)=>{
        options.push(c.choiceName);
        // console.log(c);
      });

    });
    console.log(options);

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

  // load dummy data
  // populateQuestionList(): void {
  //   let newQuestion1: Question = {
  //     id: 1,
  //     questionName: 'What system(s)	do you want to play this game on?',
  //     userResponse: '',
  //     isAnswered: false,
  //     options: ['Console', 'PC', 'No Preference']
  //   };
  //   let newQuestion2: Question = {
  //     id: 2,
  //     questionName: 'Do you want Single or Multiplayer?',
  //     userResponse: '',
  //     isAnswered: false,
  //     options: this.service.gameModes.map(x => x.name) //*Issue to be addressed: Answers only populate the second time the recommended-games page is opened */
  //   };
  //   let newQuestion3: Question = {
  //     id: 3,
  //     questionName: 'What is your age range?',
  //     userResponse: '',
  //     isAnswered: false,
  //     options: ['Less than 10 years old', 'between 10 and 13', 'between 13 and 17', '17 Years old', '18+ years old']
  //   };
  //   let newQuestion4: Question = {
  //     id: 4,
  //     questionName: 'What Genre of game are you interested in?',
  //     userResponse: '',
  //     isAnswered: false,
  //     options: this.service.genres.map(x => x.name) //*Issue to be addressed: Answers only populate the second time the recommended-games page is opened */
  //   };
  //   let newQuestion5: Question = {
  //     id: 5,
  //     questionName: 'What perspective would you prefer in your next game?',
  //     userResponse: '',
  //     isAnswered: false,
  //     options: this.service.playerPerspectives.map(x => x.name) //*Issue to be addressed: Answers only populate the second time the recommended-games page is opened */
  //   };
  //   let newQuestion6: Question = {
  //     id: 6,
  //     questionName: 'Which of these themes appeals to you the most?',
  //     userResponse: '',
  //     isAnswered: false,
  //     options: this.service.themes.map(x => x.name) //*Issue to be addressed: Answers only populate the second time the recommended-games page is opened */
  //   };
  //   this.frontEndQuestionList = [
  //     newQuestion1,
  //     newQuestion2,
  //     newQuestion3,
  //     newQuestion4,
  //     newQuestion5,
  //     newQuestion6
  //   ];
  // }
}
