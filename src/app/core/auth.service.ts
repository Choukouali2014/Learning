import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from './User';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>;
  errors;
  emptyUser:User={
    uid: '',
    email: '',
    photoURL: '',
    session: 0,
    course: '',
    displayName: '',
    favoriteColor: '',
    password: '',
    emailVerified: false
  } 

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    this.user = this.afAuth.authState
      .pipe(
        switchMap(
          user => {
            return !!user ? this.afs.doc<User>(`users/${user.uid}`).valueChanges() : of(null);
          })
      );
  }

  verifIfEmailExist(email) { 
   return this.afs.collection('users',ref=>ref.where('email','==',email)).valueChanges();
  }



  loginWithEmail(email, password){
   return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }


  sendVerificationEmail() {
    return this.afAuth.auth.currentUser.sendEmailVerification().
    then(() => {
      this.router.navigate(['/auth/verif-email']);
    });
  }

  signIn(email, password) {
   return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
  signOut() {
    this.afAuth.auth.signOut().then(
      () => {
        this.router.navigate(['/auth']);
      }
    );
  }
  get currentUserObservable(): string {
    return this.afAuth.auth.currentUser.uid;
  }
  uid(): string {
    return this.afAuth.auth.currentUser.uid;
  }
  get emailVerified(): boolean {
    return this.afAuth.auth.currentUser.emailVerified;
  }
  public updateVerifEmail(user){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    let data ={
      emailVerified: user.emailVerified
    };
    
    return userRef.set(data, { merge: true });
  }
  public updateUserData(user, formValues?:any ) {
    console.log(user);
    console.log(formValues);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    let data: User = {
      uid: user.uid,
      email: user.email,
      displayName: !!user.displayName ? user.displayName : formValues.displayName,
      session: 1,
      course: !!user.course ? user.course : formValues.course,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    
    return userRef.set(data, { merge: true });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    let emailVerified;
    let user;
    this.user.subscribe(userData => {
        user = userData;
        emailVerified = userData.emailVerified;
    }); 
    return (user !== null && emailVerified !== false) ? true : false;
  }
}
