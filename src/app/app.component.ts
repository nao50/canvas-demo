import {AfterViewInit, Component, DoCheck, ViewChild, OnInit, ElementRef} from '@angular/core';

import { ImageService } from './services/image.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit, OnInit {
  rectW = 100;
  rectH = 100;
  rectColor = '#FF0000';
  lastPosition = { x: null, y: null };
  isDrag = false;

  context: CanvasRenderingContext2D = null;
  canvas: HTMLCanvasElement = null;

  @ViewChild('Canvas') Canvas: ElementRef;
  @ViewChild('heroImage') image: ElementRef;

  constructor(
    private imageService: ImageService
  ) {}

  ngOnInit() {
    this.lastPosition = { x: null, y: null };
  }

  getPhoto() {
    console.log(this.imageService.getImage());
    return this.imageService.getImage();
  }

  // getPhoto() {
  //   return this.imageService.getImage().subscribe(
  //     response => {
  //       console.log(response);
  //     });
  // }

  ngAfterViewInit() {
    this.canvas = this.Canvas.nativeElement;
    this.context = this.canvas.getContext('2d');

    const clearButton = document.querySelector('#clear-button');
    clearButton.addEventListener('click', (event) => this.clear(event));
    this.canvas.addEventListener('mousedown', (event) => this.dragStart(event));
    this.canvas.addEventListener('mouseup', (event) => this.dragEnd(event));
    this.canvas.addEventListener('mouseout', (event) => this.dragEnd(event));
    this.canvas.addEventListener('mousemove', (event) => {
      this.draw(event.layerX, event.layerY);
    });
  }

  draw(x, y) {
    if ( !this.isDrag ) {
      return;
    }

    this.context.lineCap = 'round'; // 丸みを帯びた線にする
    this.context.lineJoin = 'round'; // 丸みを帯びた線にする
    this.context.lineWidth = 5; // 線の太さ
    this.context.strokeStyle = 'black'; // 線の色

    if ( this.lastPosition.x === null || this.lastPosition.y === null) {
      this.context.moveTo(x, y);
    } else {
      this.context.moveTo(this.lastPosition.x, this.lastPosition.y);
    }

    this.context.lineTo(x, y);
    this.context.stroke();
    this.lastPosition.x = x;
    this.lastPosition.y = y;

  }

  clear(event) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  dragStart(event) {
    this.context.beginPath();
    this.isDrag = true;
  }

  dragEnd(event) {
    this.context.closePath();
    this.isDrag = false;

    this.lastPosition.x = null;
    this.lastPosition.y = null;
  }



  saveCanvas() {
    console.log('CALLED01');

    const imageType = 'image/png';
    const fileName = 'sample.png';
    // const canvas2 = document.getElementById('canvas');
    const base64 = this.canvas.toDataURL(imageType);
    const blob = this.dataURItoBlob(base64);

    console.log(blob);
    // this.saveBlob(blob, fileName);
  }

  dataURItoBlob(dataURI) {
    const imageType = 'image/png';
    // DataURLのデータ部分をBase64からデコード
    const binary = atob(dataURI.split(',')[1]);
    const array = [];
    // Arrayに 1 バイトずつ値を埋める
    for ( let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: imageType});
  }

  // saveBlob(blob, fileName) {
  //   const url = window.URL;
  //   // ダウンロード用のURL作成
  //   const dataUrl = url.createObjectURL(blob);
  //   // イベント作成
  //   const event = document.createEvent('MouseEvents');
  //   event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  //   // a要素を作成
  //   const a = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
  //   // ダウンロード用のURLセット
  //   a.href = dataUrl;
  //   // ファイル名セット
  //   a.download = fileName;
  //   // イベントの発火
  //   a.dispatchEvent(event);
  // }

  
}
