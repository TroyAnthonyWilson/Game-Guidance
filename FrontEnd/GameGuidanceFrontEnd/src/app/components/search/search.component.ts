import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Search } from 'src/app/interfaces/search';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  search: string = "";
  searchResult: Search[] = [];

  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.search = params['search'];
      this.loadSearchResult(); 
    }
    );
  }

loadSearchResult(){
  this.api.search({search: this.search}).subscribe((data: Search[]) => {
    console.log(data);
    this.searchResult = data;
  });
}
}
