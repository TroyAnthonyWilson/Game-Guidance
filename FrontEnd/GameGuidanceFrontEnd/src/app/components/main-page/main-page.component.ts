
import { Component} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { UserFavorite } from 'src/app/interfaces/user-favorite';
import { AuthService } from 'src/app/services/auth.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})

export class MainPageComponent  {
[x: string]: any;

   public users: any = [];
   public username: string = "";
   favorites: UserFavorite[] = [];
   ratingControl = new FormControl(0);

  constructor(private router: Router, config: NgbRatingConfig, private favorite : FavoriteService,private auth: AuthService ,private userService: UserService) {
     config.max = 5;
  }

    ngOnInit(): void {
      this.getUserNameFromToken();
      this.getFavorites();
    }


    getUserNameFromToken(){
      this.userService.getUserName()
      .subscribe(val => {
      let usernameFromToken = this.auth.getUserNameFromToken();
      this.username = val || usernameFromToken;
    });
  }

    getFavorites = () : void => {
      this.favorite.getFavorites().subscribe((data: any) => {
      this.favorites = data;
    });
  }

  addToFavorites(id: number){
    this.favorite.addfavorite(id).subscribe(() => {
    this.getFavorites();
  }); 
  };

  removeFromFavorites(id: number){
    this.favorite.removeFavorite(id).subscribe(() => {
    this.getFavorites();
  }); 
  }

  updateRating(id: number, rating: number){
    this.favorite.updateRating(id, rating).subscribe(() => {
      this.getFavorites();
    }); 
  }
  navigateToNewGame(){
    this['router'].navigate(['/findNewGame']); // when user signs out -> go to sign in page
  }
}