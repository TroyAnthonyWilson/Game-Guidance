import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {

  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';

  constructor() { }

  ngOnInit(): void {
  }

  hideShowPassword(){
    if(this.isText){
      this.type = 'password';
      this.isText = false;
      this.eyeIcon = 'fa-eye-slash';
    }else{
      this.type = 'text';
      this.isText = true;
      this.eyeIcon = 'fa-eye';
    }
  }

}
