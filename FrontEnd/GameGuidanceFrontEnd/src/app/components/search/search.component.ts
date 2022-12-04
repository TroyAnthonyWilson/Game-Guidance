import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Search } from 'src/app/interfaces/gameInfo';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  search: string = "";
  searchResult: Search[] = [];

  constructor(private route: ActivatedRoute, private api: ApiService, private searching : SearchService) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.search = params['search'];
      this.loadSearchResult(); 
    }
    );
  }

loadSearchResult(){
  if(this.search == ""){
    console.log("No search");
    return;
  }
  this.searching.search({search: this.search}).subscribe((data: Search[]) => {
    console.log(data);
    this.searchResult = data;
  });
}

// add to favorites
addToFavorites(id: number){
  console.log("Add to favorites: " + id);
  this.api.addfavorite(id).subscribe((data: any) => {
    console.log(data);
  });
}
}
