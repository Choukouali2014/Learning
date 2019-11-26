import { Component, OnInit } from '@angular/core';
import { CustomValidator, MustMatch } from 'src/app/shared/custom.validator';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../User';
import { formErrors } from './../../shared/data';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase';
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
    // this.firestore.collection('users',ref=>ref.where('email','==','leonelnoumbissie9@gmail.com')).valueChanges()
    // .subscribe(
    //   x => {  
    //     console.log(x);
    //   }
    // );
    // console.log(this.users);
    //this.users.map(allValue => allValue.uid === 'ItSpS4jIsdflLqZiXHhAtJX6h0W2');
   //this.firestore.collection('users').doc('users').get().subscribe(x=> console.log(x));
    
    this.signUp = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', [Validators.required, Validators.minLength(6)]],
      Confirmpassword: ['', [Validators.required, Validators.minLength(6)]],
      course: ['', [Validators.required]],
    },
    {
      validator: MustMatch('password', 'Confirmpassword')
  });
  }

  
    verifIfEmailExist(control: AbstractControl) {
    const email: string = control.value;
    let returnVal:boolean;
    this.firestore.collection('users',ref=>ref.where('email','==',email)).valueChanges().subscribe(
      x => {
        if (!!x){
          returnVal = true;
          return true;
        }
        returnVal=false;
        return false;
      }
    );
   // console.log(this.users.subscribe(x => console.log(x)));
   // const emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
    if (returnVal === false ) {
      return null;
    }
    return true;
  }


  ShowErrors() {
    this.custom.logValidationErrors(this.signUp);
  }
  signIn() {
    this.router.navigate(['/auth']);
  }
  SubmitRegister() {
    this.result =  this.auth.signUp(this.signUp.value.email);
    this.result.subscribe(
      x => {  
        if(Object.keys(x).length !== 0){
          this.errorRegister = "this user already exists on the email : "+ x[0]['email'] + " and the course is : "+x[0]['course']+"  Please try to login"; 
         
        }else{
         const resultData= this.auth.loginWithEmail(this.signUp.value.email,this.signUp.value.password);
         resultData.then(
          (result) => {
            this.auth.updateUserData(result.user, this.signUp.value);
            // if (result.user.emailVerified === false) {
            //   this.sendVerificationEmail();
            //   //redirect to a message check your email 
            // }else{
            //   //  this.updateUserData(result.user,'');
            //   this.router.navigate(['/course']);
            // }
            this.router.navigate(['/home']);
          }).catch((error) => {
            this.errorRegister = error.message;
          });
    
        }
        
        
      }
    )
    
  }

}
