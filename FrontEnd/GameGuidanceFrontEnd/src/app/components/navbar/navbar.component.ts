import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateHome(){
    this.router.navigate(['/home']); // navigate back home
  }
  navigateToAboutPage(){
    this.router.navigate(['/about']); // route to about page
  }
  navigateUserToLogout(){
    this.router.navigate(['/login']); // when user signs out -> go to sign in page
  }
  navigateToNewGame(){
    this.router.navigate(['/findNewGame']); // when user signs out -> go to sign in page
  }


}
