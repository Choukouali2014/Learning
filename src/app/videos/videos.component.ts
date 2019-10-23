import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {  NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { VideosService } from '../videos.service';
import { ActivatedRoute } from '@angular/router';

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
  videosV: any = [];
  imagesView;
  constructor(private modalService: NgbModal,private route: ActivatedRoute,private sanitizer: DomSanitizer, private videoService: VideosService) { }
//   videos = {
//     "topicRecord": [
//         {
//             "key": "week1",
//             "url": "https://api.zoom.us/recording/share/VHEJZAfHj8MlNP7uBFcHwUQj6Lyrqzmi45eebEa9m_2wIumekTziMw"
//         },
//         {
//             "key": "week2",
//             "url": "https://camertech.s3.us-east-2.amazonaws.com/topic-week2.mp4"
//         },
//         {
//             "key": "week3",
//             "url": "https://camertech.s3.us-east-2.amazonaws.com/topic-week3.mp4"
//         },
//         {
//             "key": "week4",
//             "url": "https://camertech.s3.us-east-2.amazonaws.com/topic-week4.mp4"
//         }
//     ]
// }
  ngOnInit() {
    this.values = this.load();
  }

 // imagesView = [1, 2, 3, 4, 5, 6, 7,8,9].map(() => `https://picsum.photos/350/150?random&t=${Math.random()}`);  
  openXl(content) {
    const modalRef = this.modalService.open(NgbdModalContent, {size: "lg", keyboard: false, centered: true});
    modalRef.componentInstance.name =this.sanitizer.bypassSecurityTrustResourceUrl(content);
   
    // for(let item of this.videosV[0]){
    //     if(content === item.start_time){
    //       const modalRef = this.modalService.open(NgbdModalContent, {size: "lg", keyboard: false, centered: true});
    //      modalRef.componentInstance.name =this.sanitizer.bypassSecurityTrustResourceUrl(item.share_url);
    //     }
    // }
  }

  load(){
    let term = this.route.snapshot.paramMap.get('id');
    this.imagesView = `../../assets/images/${term}.png`
    let data =[];
      this.videoService.getVideos().pipe(
  
      ).subscribe( x =>{
        for(let i =0; i<x.length;i++){
          if(x[i].topic.toLowerCase().indexOf(term) !== -1){
            data.push(x[i]);
          } 
        }
      }
      );
      return data;
    }
 

}
