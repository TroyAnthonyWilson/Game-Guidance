import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidateForm from 'src/app/helpers/ValidateForm';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {

  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  signUpForm!: FormGroup;


  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      userName: ['', [Validators.required]],
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

  onSignup(){
    if(this.signUpForm.valid){
      console.log(this.signUpForm.value);
      this.auth.signUp(this.signUpForm.value)
      .subscribe({
        next: (res =>{
          alert(res.message);
          this.signUpForm.reset();
          this.router.navigate(['login']);
        }),
        error: (err => {
          alert(err?.error.message);
        })
      })
    }else{
      ValidateForm.validateAllFormFileds(this.signUpForm);
    }
  }
}
