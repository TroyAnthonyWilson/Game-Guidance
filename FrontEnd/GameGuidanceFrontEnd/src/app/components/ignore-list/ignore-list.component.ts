import { Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { UserFavorite } from 'src/app/interfaces/user-favorite';
import { AuthService } from 'src/app/services/auth.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { IgnoreService } from 'src/app/services/ignore.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ignore-list',
  templateUrl: './ignore-list.component.html',
  styleUrls: ['./ignore-list.component.css']
})
export class IgnoreListComponent implements OnInit {

  constructor(private ignore: IgnoreService, private router: Router, config: NgbRatingConfig, private favorite : FavoriteService,private auth: AuthService ,private userService: UserService) { }

  public users: any = [];
  public username: string = "";
  ignores: UserFavorite[] = [];


  
  ngOnInit(): void {
    this.getIgnore();
    this.getUserNameFromToken();
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

  getUserNameFromToken(){
    this.userService.getUserName()
    .subscribe(val => {
    let usernameFromToken = this.auth.getUserNameFromToken();
    this.username = val || usernameFromToken;
  });
  }
}
