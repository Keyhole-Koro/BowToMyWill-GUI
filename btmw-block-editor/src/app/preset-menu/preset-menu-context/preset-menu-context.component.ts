import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preset-menu-context',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preset-menu-context.component.html',
  styleUrls: ['./preset-menu-context.component.css']
})
export class PresetMenuContextComponent {
  categories = ['keyword', 'identifier', 'modifier'];

  @Output() categorySelected = new EventEmitter<string>();

  selectCategory(category: string) {
    this.categorySelected.emit(category);
  }
}
