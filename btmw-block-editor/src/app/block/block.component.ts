import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type HexColor = string;

interface BlockKindObject {
  [key: string]: number;
}

export const BlockKinds: BlockKindObject = {};

export type BlockKind = number;

export interface Block {
  info: BlockInfo;
  top: number;
  left: number;
  scale: number;
}

export interface BlockInfo {
  kind: BlockKind;
  id: string;
  color: HexColor;
}

@Component({
  selector: 'app-block',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent {
  
}
export class BlockManager {
  private blocks: BlockInfo[];
  private blockKindMap: { [key in BlockKind]?: BlockInfo[] } = {};

  constructor(blocks: BlockInfo[]) {
    this.blocks = blocks;
    this.initializeBlockKinds();
    this.organizeBlocksByKind();
  }

  private initializeBlockKinds(): void {
    const uniqueKinds = [...new Set(this.blocks.map(block => block.kind))];
    uniqueKinds.forEach(kind => this.registerBlockKind(kind));
  }

  private registerBlockKind(kind: BlockKind): void {
    if (!Object.values(BlockKinds).includes(kind)) {
      BlockKinds[kind] = kind;
    }
  }

  getBlockKind(kind: string): BlockKind {
    if (!(kind in BlockKinds)) {
      BlockKinds[kind] = Object.keys(BlockKinds).length;
    }
    return BlockKinds[kind];
  }

  private organizeBlocksByKind(): void {
    this.blockKindMap = {};
    for (const block of this.blocks) {
      const kind = block.kind;
      if (!this.blockKindMap[kind]) {
        this.blockKindMap[kind] = [];
      }
      this.blockKindMap[kind]?.push(block);
    }
  }

  getBlockInfoByKind(kind: BlockKind): BlockInfo[] {
    const found = (this.blockKindMap[kind] || []).map(block => block);
    console.error("No blocks found by kind");
    return found; }

  getBlockInfoById(id: string): BlockInfo | undefined {
    const found = this.blocks.find(block => block.id === id);
    if (!found) console.error("No blocks found by id");
    return found;
  }

  getBlockInfoByColor(color: HexColor): BlockInfo[] {
    const found = this.blocks.filter(block => block.color === color);
    console.error("No blocks found by color");
    return found;
  }

  displayBlockInfoByKind(kind: BlockKind): BlockInfo[] {
    const found = this.getBlockInfoByKind(kind);
    console.error("No blocks found by id");
    return found;
  }

  displayBlockInfoById(id: string): BlockInfo | undefined {
    const found = this.getBlockInfoById(id);
    console.error("No blocks found by id");
    return found;
  }

  displayBlockInfoByColor(color: HexColor): BlockInfo[] {
    const found = this.getBlockInfoByColor(color);
    console.error("No blocks found by color");
    return found;
  }
}