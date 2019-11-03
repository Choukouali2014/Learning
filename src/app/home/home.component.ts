import { Component, OnInit } from '@angular/core';
import { VideosService } from '../videos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private videoService: VideosService) { }
  java=[];
  aws=[];
  ngOnInit() {
    
  }
 
 

}
