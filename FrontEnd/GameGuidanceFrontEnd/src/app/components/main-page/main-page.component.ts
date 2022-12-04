
import { Component, OnInit} from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Search } from 'src/app/interfaces/gameInfo';
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

   currentRate = 8;
   public users: any = [];
   public username: string = "";
   favorites: UserFavorite[] = [];

  constructor(config: NgbRatingConfig, private favorite : FavoriteService,private auth: AuthService ,private userService: UserService) {
    // customize default values of ratings used by this component tree
    config.max = 5;
    config.readonly = true;

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
      //this.getFavoritesIds();
    });
  }

  // getFavoritesIds = () => {
  //   let ids: Number[] = [];
  //   this.favorites.forEach((fav) => {
  //     ids.push(fav.gameId);
  //   });
  //   console.log("ids: " + ids);
    
  //   this.favoritesIds = ids;
  //   console.log("favoritesIds: " + this.favoritesIds);   
  // };

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