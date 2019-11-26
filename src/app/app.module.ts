import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule} from '@angular/fire';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { VideosComponent, NgbdModalContent } from './videos/videos.component';
import { HttpClientModule } from '@angular/common/http';
import { VideosService } from './videos.service';
import { HomeComponent } from './home/home.component';
import { environment } from 'src/environments/environment';
import { AuthModule } from './core/auth/auth.module';
import { AuthGuard } from './core/auth.guard';
import { UserGuard } from './core/user.guard';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    VideosComponent,
    NgbdModalContent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgbModule
    
  ],
  entryComponents: [NgbdModalContent],
  providers: [VideosService,AuthGuard,UserGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
