import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/ValidateForm';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
    ) { }

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

  onLogin(){
    if(this.loginForm.valid){
      //console.log(this.loginForm.value);
      this.auth.login(this.loginForm.value)
      .subscribe({
        next: (res => {
          alert(res.message);
          this.loginForm.reset();
          this.auth.storeToken(res.token);
          this.router.navigate(['home']);
        }),
        error: (err => {
          alert(err?.error.message);
        })        
      })
  }else{
    ValidateForm.validateAllFormFileds(this.loginForm);
  }
}

}
