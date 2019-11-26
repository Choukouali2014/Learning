import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { AngularFireAuthModule  } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthRoutingModule } from '../auth-routing.module';
import { VerifEmailComponent } from '../verif-email/verif-email.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    VerifEmailComponent
  ],
  imports: [
    SharedModule,
    AngularFireAuthModule,
    AuthRoutingModule,
    AngularFirestoreModule
  ]
})
export class AuthModule { }
