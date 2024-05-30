import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlockComponent } from './block/block.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BlockComponent],
  template: `
    <app-block></app-block>
  `,
  //templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'btmw-block-editor';
}
