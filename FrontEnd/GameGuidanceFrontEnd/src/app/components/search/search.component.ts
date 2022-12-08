import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Search } from 'src/app/interfaces/gameInfo';
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
  ignores: UserFavorite[] = [];
  favoritesIds: Number[] = [];
  ignoreIds: Number[] = [];

  constructor(
    private route: ActivatedRoute,
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
    if(this.search == ""){
      alert("Please enter a search term");
      return;
    }
    this.searching.search({search: this.search}).subscribe((data: Search[]) => {
      this.searchResult = data;
    });
  }
}
