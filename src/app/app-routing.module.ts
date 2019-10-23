import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideosComponent } from './videos/videos.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path:'',pathMatch:'full', redirectTo:'/home'},
  { path:'home', component:HomeComponent},
  { path: 'detail/:id', component: VideosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
