import { Component, Input, HostListener, AfterViewInit, ViewChildren, QueryList, ElementRef, SimpleChanges, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Block {
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

export class BlockComponent implements OnChanges, AfterViewInit {
  @Input() blocks: Block[] = [];
  scaleValues: number[] = [];
  isMouseDown = false;
  isScreenDragging = false;
  screenDragStartX = 0;
  screenDragStartY = 0;
  screenOffsetX = 0;
  screenOffsetY = 0;
  offsetX = 0;
  offsetY = 0;
  activeBlockIndex = -1;
  snapTargetIndex = -1;
  snapThreshold = 50;

  @ViewChildren('blockElem') blockElements!: QueryList<ElementRef>;

  ngAfterViewInit() {
    this.setBlockStyles();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['blocks']) {
      this.setBlockStyles();
    }
  }

  private setBlockStyles() {
    if (this.blockElements) {
      this.blockElements.forEach((blockElem, index) => {
        const block = this.blocks[index];
        blockElem.nativeElement.style.top = block.top;
        blockElem.nativeElement.style.left = block.left;
        blockElem.nativeElement.style.position = 'absolute';
      });
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.isMouseDown = true;
    const targetElement = event.target as HTMLElement;
    const className = targetElement.className;
    if (className === 'block') {
      this.activeBlockIndex = Array.from(targetElement.parentNode!.children).indexOf(targetElement);

      const blockRect = targetElement.getBoundingClientRect();
      this.offsetX = event.clientX - blockRect.left;
      this.offsetY = event.clientY - blockRect.top;
      this.snapTargetIndex = -1;
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isMouseDown = false;
    this.isScreenDragging = false;
    this.snapTargetIndex = -1;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isMouseDown && this.activeBlockIndex !== -1) {
      const newLeft = event.clientX - this.offsetX + 'px';
      const newTop = event.clientY - this.offsetY + 'px';
      this.blocks[this.activeBlockIndex] = { ...this.blocks[this.activeBlockIndex], top: newTop, left: newLeft };

      let nearestAttraction = null;
      let nearestDistance = this.snapThreshold;

      for (let i = 0; i < this.blocks.length; i++) {
        if (i !== this.activeBlockIndex) {
          const activeBlockElem = this.blockElements.toArray()[this.activeBlockIndex].nativeElement as HTMLElement;
          const targetBlockElem = this.blockElements.toArray()[i].nativeElement as HTMLElement;
          const attraction = this.calculateAttraction(activeBlockElem, targetBlockElem, this.snapThreshold);

          if (attraction) {
            const distance = this.calculateDistance(activeBlockElem, targetBlockElem);
            if (distance < nearestDistance) {
              nearestDistance = distance;
              nearestAttraction = attraction;
              this.snapTargetIndex = i;
              this.isMouseDown = false;
            }
          }
        }
      }

      const activeBlockElem = this.blockElements.toArray()[this.activeBlockIndex].nativeElement as HTMLElement;
      activeBlockElem.style.top = this.blocks[this.activeBlockIndex].top;
      activeBlockElem.style.left = this.blocks[this.activeBlockIndex].left;
    }

    if (this.isScreenDragging) {
      const deltaX = event.clientX - this.screenDragStartX;
      const deltaY = event.clientY - this.screenDragStartY;
      this.screenOffsetX += deltaX;
      this.screenOffsetY += deltaY;
      
      this.blocks.forEach((block, index) => {
        const newLeft = parseFloat(block.left) + deltaX + 'px';
        const newTop = parseFloat(block.top) + deltaY + 'px';
        console.log(String(index) + ",top" + newTop + ",left" + newLeft);
        this.blocks[index] = { ...block, top: newTop, left: newLeft };
        const blockElem = this.blockElements.toArray()[index].nativeElement as HTMLElement;
        blockElem.style.top = newTop;
        blockElem.style.left = newLeft;
      });

      this.screenDragStartX = event.clientX;
      this.screenDragStartY = event.clientY;
    }
  }


  calculateAttraction(block1Elem: HTMLElement, block2Elem: HTMLElement, threshold: number): { top?: string; left?: string } | null {
    const rect1 = block1Elem.getBoundingClientRect();
    const rect2 = block2Elem.getBoundingClientRect();
    const gap = 5;

    const xDistance = rect2.left - rect1.left;
    const yDistance = rect2.top - rect1.top;

    if (Math.abs(xDistance) < threshold && Math.abs(yDistance) < threshold) {
      if (Math.abs(xDistance) > Math.abs(yDistance)) {
        if (xDistance > 0 && xDistance < rect1.width) {
          return { left: `${rect2.left - rect1.width - gap}px` };
        } else if (xDistance < 0 && -xDistance < rect2.width) {
          return { left: `${rect2.right + gap}px` };
        }
      } else {
        if (yDistance > 0 && yDistance < rect1.height) {
          return { top: `${rect2.top - rect1.height - gap}px` };
        } else if (yDistance < 0 && -yDistance < rect2.height) {
          return { top: `${rect2.bottom + gap}px` };
        }
      }
    }
    return null;
  }

  calculateDistance(block1Elem: HTMLElement, block2Elem: HTMLElement): number {
    const rect1 = block1Elem.getBoundingClientRect();
    const rect2 = block2Elem.getBoundingClientRect();
    const xDistance = rect2.left - rect1.left;
    const yDistance = rect2.top - rect1.top;
    return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
  }
}
