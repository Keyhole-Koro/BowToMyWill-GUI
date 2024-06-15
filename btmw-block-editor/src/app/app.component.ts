import { Component, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceComponent } from './workspace/workspace.component';
import { PresetMenuComponent } from './preset-menu/preset-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PresetMenuComponent, WorkspaceComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  
}
