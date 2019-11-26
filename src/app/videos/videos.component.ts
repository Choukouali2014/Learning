import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {  NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { VideosService } from '../videos.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';

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
  values:any[];
  videosV;
  imagesView;
  showSpinner: boolean = true;
  term='';
  constructor(private auth: AuthService,private modalService: NgbModal,private route: ActivatedRoute,private sanitizer: DomSanitizer, private videoService: VideosService) {
    this.auth.user.subscribe(
      userData => {
        if(!!userData){
          this.term = userData['course'];
        }
      }
    );
   }

  ngOnInit() {
    //let term = this.route.snapshot.paramMap.get('id');
    this.videoService.getVideos().pipe(
        map(list => list.filter(lists => lists.topic.toLowerCase().indexOf(this.term) !== -1)),
        map( mapValue => mapValue.map(allValue => this.videosV={
          topic: allValue.topic,
          share_url:allValue.share_url,
          start_time: allValue.start_time.substring(0,10)
        }))
      ).subscribe(
      data => {
        this.values = data;
        this.showSpinner = false;
      }
    );
    
  }

 openXl(content) {
    const modalRef = this.modalService.open(NgbdModalContent, {size: "lg", keyboard: false, centered: true});
    modalRef.componentInstance.name =this.sanitizer.bypassSecurityTrustResourceUrl(content); 
  }
}
