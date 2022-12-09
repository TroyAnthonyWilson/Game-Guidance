import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  search: string = "";

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  navigateHome(){
    this.router.navigate(['/home']); // navigate back home
  }
  navigateToAboutPage(){
    this.router.navigate(['/about']); // route to about page
  }
  navigateUserToLogout(){
    this.auth.signOut();
  }
  navigateToNewGame(){
    this.router.navigate(['/findNewGame']); // when user signs out -> go to sign in page
  }

  navigateToIgnoreList(){
    this.router.navigate(['/ignore']); // when user signs out -> go to sign in page
  }

  submit = (search: string) => {
    this.router.navigate(['/search'], { queryParams: { search: search } });
  }

}
