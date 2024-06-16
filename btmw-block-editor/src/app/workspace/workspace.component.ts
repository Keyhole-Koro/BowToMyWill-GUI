import { Component, HostListener, ViewChild, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceGridComponent } from './workspace-grid/workspace-grid.component';
import { WorkspaceBlockComponent, Block } from './workspace-block/workspace-block.component';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [CommonModule, WorkspaceGridComponent, WorkspaceBlockComponent],
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent {
  @ViewChild(WorkspaceGridComponent) gridComponent!: WorkspaceGridComponent;
  @ViewChild(WorkspaceBlockComponent) workspaceBlockComponent!: WorkspaceBlockComponent;

  public scale: number = 1;
  public isDragging: boolean = false;
  public deltaX = 0;
  public deltaY = 0;
  public lastMouseX: number = 0;
  public lastMouseY: number = 0;
  public minScale: number = 0.7;
  public maxScale: number = 1.5;
  public blocks: Block[] = [];

  @Input() newBlock: Block | undefined;

  ngOnChanges(changes: SimpleChanges) {
    if (changes["newBlock"] && this.newBlock) {
      this.addBlock(this.newBlock);
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.gridComponent.resizeCanvas();
  }

  @HostListener('wheel', ['$event'])
  onWheelScroll(event: WheelEvent) {
    const zoomIntensity = 0.1;
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const oldScale = this.scale;
    const canvas = this.gridComponent.canvas.nativeElement;
  
    const dx = (mouseX - this.gridComponent.offsetX) / (canvas.width * this.scale);
    const dy = (mouseY - this.gridComponent.offsetY) / (canvas.height * this.scale);
  
    if (event.deltaY > 0) {
      this.scale = Math.max(this.minScale, this.scale - zoomIntensity);
    } else {
      this.scale = Math.min(this.maxScale, this.scale + zoomIntensity);
    }
  
    this.gridComponent.offsetX = mouseX - dx * (canvas.width * this.scale);
    this.gridComponent.offsetY = mouseY - dy * (canvas.height * this.scale);
  
    this.gridComponent.updateScale(this.scale);
  
    this.workspaceBlockComponent.updateBlockScroll(mouseX, mouseY, this.scale, oldScale);
  }
  

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    const className = targetElement.className;
    if (className !== 'workspace') return;

    this.isDragging = true;
    this.lastMouseX = event.clientX;
    this.lastMouseY = event.clientY;

    const canvasElement = this.gridComponent.canvas.nativeElement;
    canvasElement.classList.add('dragging');
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      this.deltaX = event.clientX - this.lastMouseX;
      this.deltaY = event.clientY - this.lastMouseY;

      this.gridComponent.updateOffset(this.deltaX, this.deltaY);
      this.workspaceBlockComponent.deltaX = this.deltaX;
      this.workspaceBlockComponent.deltaY = this.deltaY;
      this.workspaceBlockComponent.updateBlockMove();

      this.lastMouseX = event.clientX;
      this.lastMouseY = event.clientY;

      this.deltaX = 0;
      this.deltaY = 0;
    }
  }

  @HostListener('mouseup')
  onMouseUp() {
    this.isDragging = false;
    const canvasElement = this.gridComponent.canvas.nativeElement;
    canvasElement.classList.remove('dragging');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isDragging = false;
    const canvasElement = this.gridComponent.canvas.nativeElement;
    canvasElement.classList.remove('dragging');
  }

  addBlock(block: Block) {
    this.blocks.push(block);
  }
}
