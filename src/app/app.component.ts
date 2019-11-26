import { Component, ViewChild } from '@angular/core';
import { NgbSlideEvent, NgbCarousel, NgbModal, NgbSlideEventSource, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'learning';
  user : any;
  constructor(private auth: AuthService){
    this.auth.user.subscribe(userData =>{
      this.user = userData;
    });
  }

  images = [1, 2, 3, 4, 5, 6, 7].map(() => `https://picsum.photos/1349/500?random&t=${Math.random()}`);
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;

  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }
  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }
}
