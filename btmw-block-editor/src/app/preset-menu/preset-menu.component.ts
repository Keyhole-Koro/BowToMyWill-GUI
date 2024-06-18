import { Component, OnInit, ViewChildren, QueryList, ElementRef, HostListener, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Block, BlockInfo, BlockManager } from '../block/block.component';
import { PresetMenuContextComponent } from './preset-menu-context/preset-menu-context.component';
import { PresetMenuBlockComponent } from './preset-menu-block/preset-menu-block.component';
import { PresetMenuBufBlockComponent } from './preset-menu-buf-block/preset-menu-buf-block.component';

import { BlockManagerService } from '../block/block-manager.service';

@Component({
  selector: 'app-preset-menu',
  standalone: true,
  imports: [CommonModule, PresetMenuContextComponent, PresetMenuBlockComponent, PresetMenuBufBlockComponent],
  templateUrl: './preset-menu.component.html',
  styleUrls: ['./preset-menu.component.css', '../block/block.component.css'],
})
export class PresetMenuComponent implements OnInit {
  blockManager: BlockManager | undefined;

  @Output() newBlockChanged = new EventEmitter<Block>();
  bufferBlock: Block | null = null;

  preset_block_info: BlockInfo[] = [];

  constructor(private blockManagerService: BlockManagerService) {
    this.blockManager = this.blockManagerService.getManager()
  }

  ngOnInit(): void {
    this.initBlocks();
  }

  onBufferBlockCreated(bufferBlock: Block) {
    console.log("created");
    this.bufferBlock = {...bufferBlock};
  }
  
  onBlockDropped() {
    console.log("dropped");
    if (!this.bufferBlock) return;
    this.newBlockChanged.emit(this.bufferBlock);
    this.bufferBlock = null;
  }

  initBlocks(): void {
    if (!this.blockManager) {
      console.error("no blockManager set");
      return;
    }
    this.preset_block_info = [
      {
        kind: this.blockManager.getBlockKind("IDENTIFIER"),
        id: "block",
        color: "#FF0000"
      },
      {
        kind: this.blockManager.getBlockKind("IDENTIFIER"),
        id: "block1",
        color: "#00FF00"
      },
      {
        kind: this.blockManager.getBlockKind("IDENTIFIER"),
        id: "block2",
        color: "#0000FF"
      },
    ]
  }
  
}
