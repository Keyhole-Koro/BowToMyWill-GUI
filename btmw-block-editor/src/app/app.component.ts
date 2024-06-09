import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlockComponent } from './block/block.component';
import { WorkspaceComponent } from './workspace/workspace.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BlockComponent, WorkspaceComponent],
  template: `
    <app-block></app-block>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'btmw-block-editor';
}
