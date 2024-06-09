import { Component } from '@angular/core';
import { MatDrawerModule } from '@angular/material/drawer';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [MatDrawerModule],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.css'
})
export class WorkspaceComponent {

}
