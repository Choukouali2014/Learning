import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { VerifEmailComponent } from './verif-email/verif-email.component';


const routes: Routes = [
  // parent pathkk
  {  path: '', children: [
      { path: '',  component: LoginComponent},
      { path: 'verif-email',  component: VerifEmailComponent},
      { path:'register', component: RegisterComponent}
    ]}

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class AuthRoutingModule { }
