import {AfterViewInit, Component, DoCheck, ViewChild, OnInit, ElementRef} from '@angular/core';

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

  ngOnInit() {
    this.lastPosition = { x: null, y: null };
  }

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

}
