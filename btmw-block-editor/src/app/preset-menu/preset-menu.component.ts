import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Block } from '../block/block.component';

@Component({
  selector: 'app-preset-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preset-menu.component.html',
  styleUrls: ['./preset-menu.component.css', '../block/block.component.css'],
})
export class PresetMenuComponent implements OnInit {
  preset_blocks: Block[] = [];
  preset_num: number = 0;

  ngOnInit(): void {
    console.log('PresetComponent initialized');
    console.log(this.preset_blocks);
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
}
