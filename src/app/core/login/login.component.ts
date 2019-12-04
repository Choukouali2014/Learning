import { Component, OnInit } from '@angular/core';
import { CustomValidator } from 'src/app/shared/custom.validator';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '../User';
import { formErrors } from './../../shared/data';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  custom= CustomValidator;
  signIn: FormGroup;
  user: User;
  formErrors = formErrors;
  errors;
  message;
  constructor( private router: Router, private fb:FormBuilder, public auth: AuthService) { }

  ngOnInit() {
    this.signIn = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]],
    });
  }


  ShowErrors() {
    this.custom.logValidationErrors(this.signIn);
  }
  register() {
    this.router.navigate(['/auth/register']);
  }
  onSubmit() {
    const result =  this.auth.signIn(this.signIn.value.email, this.signIn.value.password);
    result.then(
      (result) => {
        if (result.user.emailVerified === false) {
          this.auth.sendVerificationEmail();
          //redirect to a message check your email 
        }else{
          this.message = false;
          this.router.navigate(['/home']);
        }
        console.log("here we go");
        this.auth.updateVerifEmail(result.user);
        
      }).catch((error) => {
        this.message = true;
        this.errors = error.message;
      });
   
    
  }
}
