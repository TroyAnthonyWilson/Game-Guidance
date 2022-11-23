import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

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
