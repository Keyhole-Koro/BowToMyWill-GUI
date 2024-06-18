import { Injectable } from '@angular/core';
import { BlockInfo, BlockManager } from './block.component';

@Injectable({
  providedIn: 'root'
})
export class BlockManagerService {
  private presets: BlockInfo[] = [
    { kind: 0, id: 'block1', color: '#ff5733' },
    { kind: 1, id: 'block2', color: '#33ff57' },
    { kind: 2, id: 'block3', color: '#3357ff' },
    { kind: 0, id: 'block4', color: '#ff5733' }
  ];

  public manager = new BlockManager(this.presets);

  getManager(): BlockManager {
    return this.manager;
  }
}
