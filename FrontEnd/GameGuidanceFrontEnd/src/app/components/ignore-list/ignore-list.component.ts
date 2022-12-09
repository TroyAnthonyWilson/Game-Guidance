import { Component, OnInit } from '@angular/core';
import { UserFavorite } from 'src/app/interfaces/user-favorite';
import { IgnoreService } from 'src/app/services/ignore.service';

@Component({
  selector: 'app-ignore-list',
  templateUrl: './ignore-list.component.html',
  styleUrls: ['./ignore-list.component.css']
})
export class IgnoreListComponent implements OnInit {

  constructor(private ignore: IgnoreService) { }

  ignores: UserFavorite[] = [];


  ngOnInit(): void {
    this.getIgnore();
  }

  getIgnore = () : void => {
    this.ignore.getIgnore().subscribe((data: any) => {
      this.ignores = data;
    });
  } 

  removeIgnore = (id: number) : void => {
    this.ignore.removeIgnore(id).subscribe(() => {
      this.getIgnore();
    });
  }

}
