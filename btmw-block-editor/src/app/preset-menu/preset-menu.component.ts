import { Component, OnInit, ViewChildren, QueryList, ElementRef, HostListener, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Block, BlockInfo, BlockManager, BlockStyle, BlockKind } from '../block/block.component';
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
  target_preset_block_info: BlockInfo[] = [];

  constructor(private blockManagerService: BlockManagerService) {
    this.blockManager = this.blockManagerService.getManager()
  }

  ngOnInit(): void {
    this.initBlocks();
  }

  onBufferBlockCreated(bufferBlock: Block) {
    this.bufferBlock = {...bufferBlock};
  }
  
  onBlockDropped() {
    if (!this.bufferBlock) return;
    this.newBlockChanged.emit(this.bufferBlock);
    this.bufferBlock = null;
  }

  initBlocks(): void {
    if (!this.blockManager) {
      console.error("no blockManager set");
      return;
    }
    const idfr = {
      id: "identifier",
      style: BlockStyle.NORMAL
    };
    const other = {
      id: "other",
      style: BlockStyle.NORMAL
    };
    this.blockManager.registerBlockKind(idfr)
    this.preset_block_info = [
      {
        kind: idfr,
        id: "block",
        color: "#FF0000"
      },
      {
        kind: idfr,
        id: "block1",
        color: "#00FF00"
      },
      {
        kind: idfr,
        id: "block2",
        color: "#0000FF"
      },
      {
        kind: other,
        id: "block4",
        color: "#000000"
      },
    ]
  }
  
  optionsBarWidth = 10;
  adjustSideMenu(newWidth: number) {
    this.optionsBarWidth = newWidth;
  }

  isOptionBarVisible = false;
  toggleOptionBar(visible: boolean) {
    this.isOptionBarVisible = visible;
  }

  arrangeTargetBlocks(kind: BlockKind) {
    this.target_preset_block_info =
        this.preset_block_info.filter((block) => block.kind.id === kind.id);
    console.log(this.target_preset_block_info);
  }
}
