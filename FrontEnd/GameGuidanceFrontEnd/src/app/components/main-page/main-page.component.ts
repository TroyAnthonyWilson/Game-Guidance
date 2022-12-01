
import { Component, OnInit} from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';




@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],


})


export class MainPageComponent {

  currentRate = 8;

   public users: any = [];


   public username: string = "";

  constructor(config: NgbRatingConfig, private api: ApiService,private auth: AuthService ,private userService: UserService) {
    // customize default values of ratings used by this component tree
    config.max = 5;
    config.readonly = true;

  }

  ngOnInit(): void {
    


    this.userService.getUserName()
    .subscribe(val => {
      let usernameFromToken = this.auth.getUserNameFromToken();
      this.username = val || usernameFromToken;
    });

    //get userdata from database
    this.api.UserData(this.auth.getToken())
    .subscribe(res => {
      console.log(res);
    });
  }
}


