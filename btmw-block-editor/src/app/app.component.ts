import { Component, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockComponent, Block } from './block/block.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, BlockComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild(BlockComponent) blockComponent!: BlockComponent;
  public ctx!: CanvasRenderingContext2D;
  public scale: number = 1;
  public baseLineSpacing: number = 50;
  public minScale: number = 0.7;
  public maxScale: number = 1.5;
  public isDragging: boolean = false;
  public deltaX = 0;
  public deltaY = 0;
  public lastMouseX: number = 0;
  public lastMouseY: number = 0;
  public offsetX: number = 0;
  public offsetY: number = 0;
  public blocks: Block[] = [];

  ngAfterViewInit() {
    const canvasElement = this.canvas.nativeElement;
    const context = canvasElement.getContext('2d');
  
    if (context) {
      this.ctx = context;
      this.resizeCanvas();
      this.initBlocks();
  
      this.centerView();
  
      this.draw();
    } else {
      console.error('Failed to get canvas context');
    }
  }
  

  resizeCanvas() {
    const canvas = this.canvas.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.draw();
  }

  initBlocks() {
    this.blocks.push({ top: 100, left: 100, text: 'red', scale: 1 });
    this.blocks.push({ top: 200, left: 200, text: 'blue', scale: 1 });
    this.blocks.push({ top: 200, left: 300, text: 'green', scale: 1 });
  }

  draw() {
    const canvas = this.canvas.nativeElement;
    const width = canvas.width;
    const height = canvas.height;
    const lineSpacing = this.baseLineSpacing * this.scale;

    this.ctx.clearRect(0, 0, width, height);

    this.drawGridLines(width, height, lineSpacing);
    this.updateBlocks();
  }

  drawGridLines(width: number, height: number, lineSpacing: number) {
    const thickLineWidth = this.scale < 1 ? 2 : 1;
    const thinLineWidth = 0.5;

    this.ctx.strokeStyle = '#BBB';
    this.ctx.lineWidth = thickLineWidth;
    for (let x = (this.offsetX % (lineSpacing * 4)); x <= width; x += lineSpacing * 4) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, height);
      this.ctx.stroke();
    }

    for (let y = (this.offsetY % (lineSpacing * 4)); y <= height; y += lineSpacing * 4) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(width, y);
      this.ctx.stroke();
    }

    this.ctx.strokeStyle = '#000';
    this.ctx.lineWidth = thinLineWidth;
    for (let x = (this.offsetX % lineSpacing); x <= width; x += lineSpacing) {
      if (Math.abs(x % (lineSpacing * 4)) >= 0.1) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, 0);
        this.ctx.lineTo(x, height);
        this.ctx.stroke();
      }
    }

    for (let y = (this.offsetY % lineSpacing); y <= height; y += lineSpacing) {
      if (Math.abs(y % (lineSpacing * 4)) >= 0.1) {
        this.ctx.beginPath();
        this.ctx.moveTo(0, y);
        this.ctx.lineTo(width, y);
        this.ctx.stroke();
      }
    }

    if (this.scale >= 1.5) {
      const subLineSpacing = lineSpacing / 4;
      this.ctx.strokeStyle = '#AAA';
      this.ctx.lineWidth = 0.5;

      for (let x = (this.offsetX % subLineSpacing); x <= width; x += subLineSpacing) {
        if (x % lineSpacing !== 0) {
          this.ctx.beginPath();
          this.ctx.moveTo(x, 0);
          this.ctx.lineTo(x, height);
          this.ctx.stroke();
        }
      }

      for (let y = (this.offsetY % subLineSpacing); y <= height; y += subLineSpacing) {
        if (y % lineSpacing !== 0) {
          this.ctx.beginPath();
          this.ctx.moveTo(0, y);
          this.ctx.lineTo(width, y);
          this.ctx.stroke();
        }
      }
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.resizeCanvas();
  }

  @HostListener('wheel', ['$event'])
  onWheelScroll(event: WheelEvent) {
    const zoomIntensity = 0.1;
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const canvas = this.canvas.nativeElement;

    const dx = (mouseX - this.offsetX) / (canvas.width * this.scale);
    const dy = (mouseY - this.offsetY) / (canvas.height * this.scale);

    if (event.deltaY > 0) {
      this.scale = Math.max(this.minScale, this.scale - zoomIntensity);
    } else {
      this.scale = Math.min(this.maxScale, this.scale + zoomIntensity);
    }

    this.offsetX = mouseX - dx * (canvas.width * this.scale);
    this.offsetY = mouseY - dy * (canvas.height * this.scale);

    this.draw();
  }

  centerView() {
    const canvas = this.canvas.nativeElement;
    this.offsetX = (canvas.width / 2) - (canvas.width * this.scale / 2);
    this.offsetY = (canvas.height / 2) - (canvas.height * this.scale / 2);
  }
  

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    const className = targetElement.className;
    if (className == '') {
      this.isDragging = true;
      this.lastMouseX = event.clientX;
      this.lastMouseY = event.clientY;

      const canvasElement = this.canvas.nativeElement;
      canvasElement.classList.add('dragging');
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      this.deltaX = event.clientX - this.lastMouseX;
      this.deltaY = event.clientY - this.lastMouseY;

      this.offsetX += this.deltaX;
      this.offsetY += this.deltaY;

      this.lastMouseX = event.clientX;
      this.lastMouseY = event.clientY;

      this.draw();
    }
  }

  @HostListener('mouseup')
  onMouseUp() {
    this.isDragging = false;
    const canvasElement = this.canvas.nativeElement;
    canvasElement.classList.remove('dragging');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isDragging = false;
    const canvasElement = this.canvas.nativeElement;
    canvasElement.classList.remove('dragging');
  }

  updateBlocks() {
    console.log(this.deltaX);
    this.blocks.forEach((block, index) => {
      this.blockComponent.updateBlockStyle(
        index
        ,this.deltaY
        ,this.deltaX
        ,this.scale
        )
    });
    this.deltaY = 0;
    this.deltaX = 0;
  }
}
