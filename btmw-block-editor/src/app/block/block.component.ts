import { Component, HostListener, AfterViewInit, ViewChildren, QueryList, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Block {
  top: string;
  left: string;
  text: string;
}

@Component({
  selector: 'app-block',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements AfterViewInit {
  blocks: Block[] = [
    { top: '100px', left: '100px', text: 'Block 1' },
    { top: '300px', left: '300px', text: 'Block 2' },
    { top: '200px', left: '200px', text: 'Block 3' }
  ];
  isMouseDown = false;
  offsetX = 0;
  offsetY = 0;
  activeBlockIndex = -1;

  @ViewChildren('block') blockElements!: QueryList<ElementRef>;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.blockElements.forEach((blockElem, index) => {
      const block = blockElem.nativeElement as HTMLElement;
      block.style.top = this.blocks[index].top;
      block.style.left = this.blocks[index].left;
    });
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('block')) {
      this.isMouseDown = true;
      this.activeBlockIndex = Array.from(target.parentNode!.children).indexOf(target);
      this.offsetX = event.clientX - parseFloat(this.blocks[this.activeBlockIndex].left);
      this.offsetY = event.clientY - parseFloat(this.blocks[this.activeBlockIndex].top);
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isMouseDown = false;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isMouseDown && this.activeBlockIndex !== -1) {
      const newLeft = event.clientX - this.offsetX + 'px';
      const newTop = event.clientY - this.offsetY + 'px';
      this.blocks[this.activeBlockIndex] = { top: newTop, left: newLeft, text: this.blocks[this.activeBlockIndex].text };

      const threshold = 50;
      let snapped = false;

      for (let i = 0; i < this.blocks.length; i++) {
        if (i !== this.activeBlockIndex) {
          const activeBlockElem = this.blockElements.toArray()[this.activeBlockIndex].nativeElement as HTMLElement;
          const targetBlockElem = this.blockElements.toArray()[i].nativeElement as HTMLElement;
          const attraction = this.calculateAttraction(activeBlockElem, targetBlockElem, threshold);

          if (attraction) {
            this.blocks[this.activeBlockIndex] = { ...this.blocks[this.activeBlockIndex], ...attraction };
            this.isMouseDown = false;
            snapped = true;
            console.log(`Block ${this.activeBlockIndex} snapped to Block ${i}`);
            break;
          }
        }
      }
    }
  }

  calculateAttraction(block1Elem: HTMLElement, block2Elem: HTMLElement, threshold: number): { top?: string; left?: string } | null {
    const rect1 = block1Elem.getBoundingClientRect();
    const rect2 = block2Elem.getBoundingClientRect();

    const xDistance = rect2.left + rect2.width / 2 - (rect1.left + rect1.width / 2);
    const yDistance = rect2.top + rect2.height / 2 - (rect1.top + rect1.height / 2);

    if (Math.abs(xDistance) < threshold && Math.abs(yDistance) < threshold) {
      if (Math.abs(xDistance) > Math.abs(yDistance)) {
        if (xDistance > 0) {
          return { left: `${rect2.left - rect1.width}px` };
        } else {
          return { left: `${rect2.right}px` };
        }
      } else {
        if (yDistance > 0) {
          return { top: `${rect2.top - rect1.height}px` };
        } else {
          return { top: `${rect2.bottom}px` };
        }
      }
    }
    return null;
  }
}
