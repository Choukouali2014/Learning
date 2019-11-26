import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideosComponent } from './videos/videos.component';
import { UserGuard } from './core/user.guard';
import { AuthGuard } from './core/auth.guard';


const routes: Routes = [
  { path:'home', component:VideosComponent,canActivate: [AuthGuard]},
  { path: 'auth',  loadChildren: './core/auth/auth.module#AuthModule', canActivate: [UserGuard]},
  { path: '', redirectTo: '/auth', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
