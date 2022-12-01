import { Component } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';




@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [NgbRatingConfig],

})


export class MainPageComponent {
  // public users: any = [];

  constructor(config: NgbRatingConfig, private api: ApiService) {
    // customize default values of ratings used by this component tree
    config.max = 5;
    config.readonly = true;
  }

  // ngOnInit(): void {
  //   this.api.getUsers()
  //   .subscribe(res => {
  //     this.users = res;
  //   })
  // }
}

