import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceComponent } from './workspace/workspace.component';
import { PresetMenuComponent } from './preset-menu/preset-menu.component';
import { Block } from './block/block.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PresetMenuComponent, WorkspaceComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  newBlock: Block | undefined = undefined;

  onNewBlockChanged(newBlockValue: Block) {
    this.newBlock = newBlockValue;
  }
}
