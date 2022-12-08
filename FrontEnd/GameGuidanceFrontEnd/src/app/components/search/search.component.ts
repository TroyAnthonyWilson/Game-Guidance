import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Search } from 'src/app/interfaces/gameInfo';
import { FavoriteService } from 'src/app/services/favorite.service';
import { SearchService } from 'src/app/services/search.service';
import { UserFavorite } from 'src/app/interfaces/user-favorite';
import { IgnoreService } from 'src/app/services/ignore.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  search: string = "";
  searchResult: Search[] = [];
  favorites: UserFavorite[] = [];
  ignores: UserFavorite[] = [];
  favoritesIds: Number[] = [];
  ignoreIds: Number[] = [];

  constructor(
    private route: ActivatedRoute,
    private favorite : FavoriteService,
    private searching : SearchService,
    private ignore: IgnoreService,
    ) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.search = params['search'];
      this.loadSearchResult();     
    });   
  }

loadSearchResult(){
  console.log("loadSearchResult");
  this.getFavorites();
  this.getIgnore();
  //console.log("favorites: " + this.favoritesIds);

  if(this.search == ""){
    alert("Please enter a search term");
    return;
  }

  this.searching.search({search: this.search}).subscribe((data: Search[]) => {
    //console.log(data);
    this.searchResult = data;
  });
}

 getFavorites = () : void => {
  console.log("getFavorites");
    this.favorite.getFavorites().subscribe((data: any) => {
      this.favorites = data;
      this.getFavoritesIds();
    });
  }

  getIgnore = () : void => {
    console.log("getIgnore");   
    this.ignore.getIgnore().subscribe((data: any) => {
      this.ignores = data;
      this.getIgnoreIds();
      // this.removeAllIgnoredGamesFromSearchResult();
    });
  }

  // removeAllIgnoredGamesFromSearchResult = () => {
  //   console.log("removeAllIgnoredGamesFromSearchResult");
  //   this.searchResult.forEach((game) => {
  //     //console.log("game: " + game.id);
  //     this.ignoreIds.forEach((id) => {
  //       console.log("id: " + id);
  //     });

  //     if(this.ignoreIds.includes(game.id)){
  //       const index = this.searchResult.indexOf(game);
  //       delete this.searchResult[index];
  //       console.log("removed: " + game.id);       
  //     }
  //   });
  // }
    

  getFavoritesIds = () => {
    console.log("getFavoritesIds");    
    let ids: Number[] = [];
    this.favorites.forEach((fav) => {
      ids.push(fav.gameId);
    });
    //console.log("ids: " + ids);
    
    this.favoritesIds = ids;
    //console.log("favoritesIds: " + this.favoritesIds);   
  };

  getIgnoreIds = () => {
    console.log("getIgnoreIds");   
    let ids: Number[] = [];
    this.ignores.forEach((ignore) => {
      ids.push(ignore.gameId);
    });
    
    
    this.ignoreIds = ids;
    //console.log("ids: " + this.ignoreIds);
  };

// add to favorites
addToFavorites(id: number){
  console.log("favoritesIds: " + this.favoritesIds);
  console.log("Add to favorites: " + id);
  this.favorite.addfavorite(id).subscribe((data: any) => {
    //console.log(data);
    this.getFavorites();
    this.getIgnore();
  }); 
  };

  addToIgnore(id: number){
    console.log("Add to ignore: " + id);
    this.ignore.addIgnore(id).subscribe((data: any) => {
      //console.log(data);
      this.getFavorites();
      this.getIgnore();
    }); 
    };

// remove from favorites
removeFromFavorites(id: number){
  console.log("Removed from favorites: " + id);
  this.favorite.removeFavorite(id).subscribe((data: any) => {
    //console.log(data);
    this.getFavorites();
  }); 
  }
}
