import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Block, BlockInfo } from '../../block/block.component';

@Component({
  selector: 'app-preset-menu-block',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preset-menu-block.component.html',
  styleUrls: ['./preset-menu-block.component.css', '../../block/block.component.css']
})
export class PresetMenuBlockComponent implements OnChanges {
  @Output() bufferBlockCreated = new EventEmitter<Block>();
  
  @Input() presetBlockInfo: BlockInfo[] | undefined;

  presetBlocks: Block[] = [];
  preset_num: number = 0;

  mouseDown(preset: Block) {
    this.bufferBlockCreated.emit({...preset});
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["presetBlockInfo"]) {
      this.arrangePresetBlocks();
    }
  }

  arrangePresetBlocks() {
    this.presetBlockInfo?.forEach((block) => {
      this.presetBlocks?.push({
        info: block
        ,top: (this.preset_num + 1) * 50
        ,left: 50
        ,scale: 1 });
      this.preset_num++;
    });
  };
}
