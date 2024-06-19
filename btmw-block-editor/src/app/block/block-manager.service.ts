import { Injectable } from '@angular/core';
import { BlockInfo, BlockManager } from './block.component';

@Injectable({
  providedIn: 'root'
})
export class BlockManagerService {

  public manager = new BlockManager([]);

  getManager(): BlockManager {
    return this.manager;
  }
}
