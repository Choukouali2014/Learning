import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {catchError, map, filter} from 'rxjs/operators';
import {Observable,  throwError} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VideosService {

  private url ='https://camertech.appspot.com/api/bucket/v1/recordings';
  constructor(private http: HttpClient) { }
  videos: any;
  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
      }
    )
  };

  getVideos(){
    return this.http.get(this.url,this.httpOptions).
    pipe(
      map(record=> JSON.parse(JSON.stringify(record))),
      map( (elements)  =>  elements.meetings),
      catchError(this.handleError)
      );
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
    } else {
      console.error('Server Side Error :', errorResponse);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
  }
}
