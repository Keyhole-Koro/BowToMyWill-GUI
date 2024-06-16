import { Component, OnInit, ViewChildren, QueryList, ElementRef, HostListener, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Block } from '../block/block.component';
import { PresetMenuContextComponent } from './preset-menu-context/preset-menu-context.component';

@Component({
  selector: 'app-preset-menu',
  standalone: true,
  imports: [CommonModule, PresetMenuContextComponent],
  templateUrl: './preset-menu.component.html',
  styleUrls: ['./preset-menu.component.css', '../block/block.component.css'],
})
export class PresetMenuComponent implements OnInit {
  @Output() newBlockChanged = new EventEmitter<Block>();

  preset_blocks: Block[] = [];
  preset_num: number = 0;

  @ViewChildren('presetBlockElem') presetElements!: QueryList<ElementRef>;

  ngOnInit(): void {
    this.initBlocks();
  }

  initBlocks() {
    this.addPresetBlocks('block');
    this.addPresetBlocks('block1');
    this.addPresetBlocks('block2');
    this.addPresetBlocks('block3');
    this.addPresetBlocks('block4');
    this.addPresetBlocks('block5');
    this.addPresetBlocks('block6');
    this.addPresetBlocks('block7');
    this.addPresetBlocks('block8');
    this.addPresetBlocks('block9');
    this.addPresetBlocks('block10');
    this.addPresetBlocks('block11');
    this.addPresetBlocks('block12');
    this.addPresetBlocks('block13');
    this.addPresetBlocks('block14');
    this.addPresetBlocks('block15');
    this.addPresetBlocks('block16');
    this.addPresetBlocks('block17');
    this.addPresetBlocks('block18');
    this.addPresetBlocks('block19');
    this.addPresetBlocks('block20');
    this.addPresetBlocks('block21');
  }

  addPresetBlocks(text: string) {
    this.preset_blocks.push({ top: (this.preset_num + 1) * 50, left: 50, text: text, scale: 1 });
    this.preset_num++;
  }

  buf_blocks: Block[] = [];
  draggingBlock: Block | null = null;
  offsetX: number = 0;
  offsetY: number = 0;

  onDragStarted(event: MouseEvent, preset: Block) {
    const new_buf = { ...preset };
    new_buf.top = event.clientY;
    new_buf.left = event.clientX;

    this.buf_blocks.push(new_buf);
    this.draggingBlock = new_buf;
    this.offsetX = event.clientX - new_buf.left;
    this.offsetY = event.clientY - new_buf.top;
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
      this.buf_blocks = this.buf_blocks.filter(buf => buf !== this.draggingBlock);
      this.newBlockChanged.emit({...this.draggingBlock});
      this.draggingBlock = null;
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onDocumentMouseUp(event: MouseEvent) {
    this.onDragEnd();
  }
}
