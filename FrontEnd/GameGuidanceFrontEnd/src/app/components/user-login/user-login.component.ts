import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidateForm from 'src/app/helpers/ValidateForm';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
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

  onSubmit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
  }else{
    ValidateForm.validateAllFormFileds(this.loginForm);
  }
}

}
