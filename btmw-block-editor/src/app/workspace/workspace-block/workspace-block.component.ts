import { Component, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Block } from '../../block/block.component';

@Component({
  selector: 'app-workspace-block',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './workspace-block.component.html',
  styleUrls: ['./workspace-block.component.css', '../../block/block.component.css']
})
export class WorkspaceBlockComponent {
  @Input() blocks: Block[] = [];
  @Input() deltaX: number = 0;
  @Input() deltaY: number = 0;
  @Input() scale: number = 1;

  updateBlockMove() {
    this.blocks.forEach(block => {
      block.left += this.deltaX;
      block.top += this.deltaY;
    });
    this.deltaY = 0;
    this.deltaX = 0;
  }

  updateBlockScroll(mouseX: number, mouseY: number, newScale: number, oldScale: number) {
    const scaleFactor = newScale / oldScale;
    this.blocks.forEach(block => {
      block.left = mouseX + (block.left - mouseX) * scaleFactor;
      block.top = mouseY + (block.top - mouseY) * scaleFactor;
      block.scale = newScale;
    });
  }

  draggingBlock: Block | null = null;
  offsetX: number = 0;
  offsetY: number = 0;

  onDragStarted(event: MouseEvent, block: Block) {
    this.draggingBlock = block;
    this.offsetX = event.clientX - block.left;
    this.offsetY = event.clientY - block.top;
    event.preventDefault();
  }

  onDrag(event: MouseEvent) {
    if (this.draggingBlock) {
      this.draggingBlock.top = event.clientY - this.offsetY;
      this.draggingBlock.left = event.clientX - this.offsetX;
    }
  }

  onDragEnd() {
    if (this.draggingBlock) {
      this.draggingBlock = null;
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onDocumentMouseUp(event: MouseEvent) {
    this.onDragEnd();
  }
}
