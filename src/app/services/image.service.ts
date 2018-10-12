import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private http: HttpClient,
  ) { }

  // getImage(): Observable<Blob> {
  //   const url = 'https://s3-ap-northeast-1.amazonaws.com/lagoon-image-panel-demo/xtech2018/Full.png';
  //   return this.http.get(url, {responseType: 'blob'});
  // }

  getImage(): string {
    const url = 'https://s3-ap-northeast-1.amazonaws.com/lagoon-image-panel-demo/xtech2018/Full.png';
    return url;
  }

}
