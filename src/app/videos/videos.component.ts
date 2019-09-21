import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgbSlideEvent, NgbCarousel, NgbModal, NgbSlideEventSource, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    <div class="embed-responsive embed-responsive-16by9 z-depth-1-half">
      <iframe class="embed-responsive-item e2e-iframe-trusted-src" 
      [src]="name"
            allowfullscreen>
            </iframe>
    </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class NgbdModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}
@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
 
  constructor(private modalService: NgbModal, private sanitizer: DomSanitizer) { }
  videos = {
    "topicRecord": [
        {
            "key": "week1",
            "url": "https://camertech.s3.us-east-2.amazonaws.com/topic-week1.mp4"
        },
        {
            "key": "week2",
            "url": "https://camertech.s3.us-east-2.amazonaws.com/topic-week2.mp4"
        },
        {
            "key": "week3",
            "url": "https://camertech.s3.us-east-2.amazonaws.com/topic-week3.mp4"
        },
        {
            "key": "week4",
            "url": "https://camertech.s3.us-east-2.amazonaws.com/topic-week4.mp4"
        }
    ]
}
  ngOnInit() {
  }

  images = [1, 2, 3, 4, 5, 6, 7].map(() => `https://picsum.photos/1349/500?random&t=${Math.random()}`);
  imagesView = this.videos['topicRecord'].map(() => `https://picsum.photos/350/150?random&t=${Math.random()}`);
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
  openXl(content) {
    
    for(let item of this.videos.topicRecord){
        if(content == item.key){
          const modalRef = this.modalService.open(NgbdModalContent, {size: "lg", keyboard: false, centered: true});
         modalRef.componentInstance.name =this.sanitizer.bypassSecurityTrustResourceUrl(item.url);
        }
    }
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
