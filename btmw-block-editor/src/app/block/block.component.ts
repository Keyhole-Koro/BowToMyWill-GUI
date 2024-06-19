import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type HexColor = string;

interface BlockKindObject {
  [key: string]: BlockKind;
}

export const BlockKinds: BlockKindObject = {};

export enum BlockStyle {
  NORMAL,
};

export interface BlockKind {
  id: string;
  style: BlockStyle;
}

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
  private blockKindMap: { [key: string]: BlockInfo[] } = {};

  constructor(blocks: BlockInfo[]) {
    this.blocks = blocks;
    this.initializeBlockKinds();
    this.organizeBlocksByKind();
  }

  private initializeBlockKinds(): void {
    const uniqueKinds = [...new Set(this.blocks.map(block => block.kind.id))];
    uniqueKinds.forEach(kindId => {
      const kind = this.blocks.find(block => block.kind.id === kindId)?.kind;
      if (kind) {
        this.registerBlockKind(kind);
      }
    });
  }

  registerBlockKind(kind: BlockKind): void {
    if (!BlockKinds[kind.id]) {
      BlockKinds[kind.id] = kind;
    }
  }

  getBlockKind(id: string): BlockKind | undefined {
    return BlockKinds[id];
  }

  private organizeBlocksByKind(): void {
    this.blockKindMap = {};
    this.blocks.forEach(block => {
      const kindId = block.kind.id;
      if (!this.blockKindMap[kindId]) {
        this.blockKindMap[kindId] = [];
      }
      this.blockKindMap[kindId].push(block);
    });
  }

  getBlockInfoByKind(kind: BlockKind): BlockInfo[] {
    return this.blockKindMap[kind.id] || [];
  }

  getBlockInfoById(id: string): BlockInfo | undefined {
    return this.blocks.find(block => block.id === id);
  }

  getBlockInfoByColor(color: HexColor): BlockInfo[] {
    return this.blocks.filter(block => block.color === color);
  }

  displayBlockInfoByKind(kind: BlockKind): BlockInfo[] {
    const found = this.getBlockInfoByKind(kind);
    if (found.length === 0) {
      console.error("No blocks found by kind");
    }
    return found;
  }

  displayBlockInfoById(id: string): BlockInfo | undefined {
    const found = this.getBlockInfoById(id);
    if (!found) {
      console.error("No blocks found by id");
    }
    return found;
  }

  displayBlockInfoByColor(color: HexColor): BlockInfo[] {
    const found = this.getBlockInfoByColor(color);
    if (found.length === 0) {
      console.error("No blocks found by color");
    }
    return found;
  }
}