import { Component, HostListener, Input, Output, EventEmitter, ViewChild, DebugEventListener } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Block } from '../../block/block.component';
import { PresetMenuComponent } from '../preset-menu.component';

@Component({
  selector: 'app-preset-menu-buf-block',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preset-menu-buf-block.component.html',
  styleUrls: ['./preset-menu-buf-block.component.css', '../../block/block.component.css']
})
export class PresetMenuBufBlockComponent {
  @Input() bufferBlock: Block | null = null;
  @Output() blockDropped = new EventEmitter<Block>();
  
  @ViewChild(PresetMenuComponent) presetMenuComponent!: PresetMenuComponent;
 
  buf_blocks: Block[] = [];

  @HostListener('document:mousemove', ['$event'])
  onDrag(event: MouseEvent) {
    if (!this.bufferBlock) return;
    this.bufferBlock.top = event.clientY;
    this.bufferBlock.left = event.clientX;
  }

  onDragEnd() {
    if (!this.bufferBlock) return;
    this.blockDropped.emit({...this.bufferBlock});
  }

  @HostListener('document:mouseup', ['$event'])
  onDocumentMouseUp() {
    this.onDragEnd();
  }
}
