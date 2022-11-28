import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [NgbRatingConfig]


})


export class MainPageComponent implements OnInit {
 

  constructor(config: NgbRatingConfig ) {
    config.max = 5;
    config.readonly = true;
  }
  ngOnInit(): void {
  }
  

}
