import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Search } from 'src/app/interfaces/gameInfo';
import { FavoriteService } from 'src/app/services/favorite.service';
import { SearchService } from 'src/app/services/search.service';
import { UserFavorite } from 'src/app/interfaces/user-favorite';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  search: string = "";
  searchResult: Search[] = [];
  favorites: UserFavorite[] = [];
  favoritesIds: Number[] = [];

  constructor(
    private route: ActivatedRoute,
    private favorite : FavoriteService,
    private searching : SearchService,
    ) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.search = params['search'];
      this.loadSearchResult();     
    });   
  }

loadSearchResult(){
  this.getFavorites();
  console.log("favorites: " + this.favoritesIds);

  if(this.search == ""){
    alert("Please enter a search term");
    return;
  }

  this.searching.search({search: this.search}).subscribe((data: Search[]) => {
    console.log(data);
    this.searchResult = data;
  });
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
    console.log("ids: " + ids);
    
    this.favoritesIds = ids;
    console.log("favoritesIds: " + this.favoritesIds);
    
  };

// add to favorites
addToFavorites(id: number){
  console.log("Add to favorites: " + id);
  this.favorite.addfavorite(id).subscribe((data: any) => {
    console.log(data);
    this.getFavorites();
  });
  };
}
