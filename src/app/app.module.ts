import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { VideosComponent, NgbdModalContent } from './videos/videos.component';
import { HttpClientModule } from '@angular/common/http';
import { VideosService } from './videos.service';
import { HomeComponent } from './home/home.component';

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
    AppRoutingModule,
    HttpClientModule,
    NgbModule
    
  ],
  entryComponents: [NgbdModalContent],
  providers: [VideosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
