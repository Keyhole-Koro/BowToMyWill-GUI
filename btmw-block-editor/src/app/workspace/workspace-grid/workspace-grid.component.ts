import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-workspace-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './workspace-grid.component.html',
  styleUrls: ['./workspace-grid.component.css']
})
export class WorkspaceGridComponent implements AfterViewInit {
  @ViewChild('workspace', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  public ctx!: CanvasRenderingContext2D;
  public scale: number = 1;
  public baseLineSpacing: number = 50;
  public offsetX: number = 0;
  public offsetY: number = 0;

  ngAfterViewInit() {
    const canvasElement = this.canvas.nativeElement;
    const context = canvasElement.getContext('2d');

    if (context) {
      this.ctx = context;
      this.resizeCanvas();
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

  draw() {
    const canvas = this.canvas.nativeElement;
    const width = canvas.width;
    const height = canvas.height;
    const lineSpacing = this.baseLineSpacing * this.scale;

    this.ctx.clearRect(0, 0, width, height);
    this.drawGridLines(width, height, lineSpacing);
  }

  drawGridLines(width: number, height: number, lineSpacing: number) {
    const thickLineWidth = this.scale < 1 ? 2 : 1;
    const thinLineWidth = 0.5;

    this.ctx.strokeStyle = '#CCC';
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

    this.ctx.strokeStyle = '#AAA';
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
      this.ctx.strokeStyle = '#BBB';
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

  centerView() {
    const canvas = this.canvas.nativeElement;
    this.offsetX = (canvas.width / 2) - (canvas.width * this.scale / 2);
    this.offsetY = (canvas.height / 2) - (canvas.height * this.scale / 2);
  }

  updateOffset(deltaX: number, deltaY: number) {
    this.offsetX += deltaX;
    this.offsetY += deltaY;
    this.draw();
  }

  updateScale(newScale: number) {
    this.scale = newScale;
    this.draw();
  }
}
