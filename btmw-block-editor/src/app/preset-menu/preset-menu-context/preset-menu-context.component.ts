import { Component, Output, EventEmitter, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

import { BlockKind, BlockStyle } from '../../block/block.component';

@Component({
  selector: 'app-preset-menu-context',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatListModule],
  templateUrl: './preset-menu-context.component.html',
  styleUrls: ['./preset-menu-context.component.css']
})
export class PresetMenuContextComponent {
  @Output() widthChange = new EventEmitter<number>();
  @Output() blockKindSelected = new EventEmitter<BlockKind>();

  constructor(private el: ElementRef) {}

  @Output() toggle = new EventEmitter<boolean>();
  isVisible = false;

  kinds: BlockKind[] = [
    {id: "identifier", style: BlockStyle.NORMAL},
    {id: "other", style: BlockStyle.NORMAL}
  ];

  showBlockKind() {
    this.isVisible = true;
    this.updateWidth();
    this.toggle.emit(true);
  }

  hideBlockKind() {
    this.isVisible = false;
    this.updateWidth();
    this.toggle.emit(false);
  }

  private updateWidth() {
    setTimeout(() => {
      const width = this.el.nativeElement.querySelector('.block-kind-bar').offsetWidth;
      this.widthChange.emit(width);
    }, 1);
  }

  onBlockKindSelected(kind: BlockKind) {
    console.log("clicked");
    this.blockKindSelected.emit(kind);
  }
}
