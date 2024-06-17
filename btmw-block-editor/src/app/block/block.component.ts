import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Block {
  top: number;
  left: number;
  text: string;
  scale: number;
}

@Component({
  selector: 'app-block',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export abstract class BlockComponent {

}
