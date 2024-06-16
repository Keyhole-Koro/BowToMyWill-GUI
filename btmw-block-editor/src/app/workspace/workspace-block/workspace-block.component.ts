import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Block {
  text: string;
  top: number;
  left: number;
  scale: number;
}

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
}
