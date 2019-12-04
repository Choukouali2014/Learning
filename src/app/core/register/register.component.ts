import { Component, OnInit } from '@angular/core';
import { CustomValidator, MustMatch } from 'src/app/shared/custom.validator';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../User';
import { formErrors } from './../../shared/data';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  signUp: FormGroup;
  user: User;
  users;
  formErrors = formErrors;
  custom = CustomValidator;
  result:any;
  errorRegister;
  constructor(public auth: AuthService,private router: Router, private firestore: AngularFirestore,private fb: FormBuilder) { }

  ngOnInit() {
    
    this.signUp = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      displayName: ['', [Validators.required, Validators.minLength(6)]],
      Confirmpassword: ['', [Validators.required, Validators.minLength(6)]],
      course: ['', [Validators.required]],
    },
    {
      validator: MustMatch('password', 'Confirmpassword')
  });
  }

  
 


  ShowErrors() {
    this.custom.logValidationErrors(this.signUp);
  }
  signIn() {
    this.router.navigate(['/auth']);
  }
  SubmitRegister() {
    this.result =  this.auth.verifIfEmailExist(this.signUp.value.email);
    this.result.subscribe(
      x => {  
        console.log(x);
        if(Object.keys(x).length !== 0){
          this.errorRegister = "this user already exists on the email : "+ x[0]['email'] + " and the course is : "+x[0]['course']+"  Please try to login"; 
         
        }else{
         const resultData= this.auth.loginWithEmail(this.signUp.value.email,this.signUp.value.password);
         resultData.then(
          (result) => {
            this.auth.updateUserData(result.user, this.signUp.value);
            if (result.user.emailVerified === false) {
              this.auth.sendVerificationEmail();
              //redirect to a message check your email 
            }else{
              //  this.updateUserData(result.user,'');
              this.router.navigate(['/home']);
            }
          }).catch((error) => {
            this.errorRegister = error.message;
          });
    
        }
        
        
      }
    )
    
  }

}
