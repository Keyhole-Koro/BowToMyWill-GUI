import { Component, Input, HostListener, AfterViewInit, ViewChildren, QueryList, ElementRef, SimpleChanges, OnChanges } from '@angular/core';

export interface Block {
  top: number;
  left: number;
  text: string;
  scale: number;
}

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnChanges, AfterViewInit {
  @Input() blocks: Block[] = [];
  scale: number = 1;
  isMouseDown = false;
  offsetX = 0;
  offsetY = 0;
  startMouseX = 0;
  startMouseY = 0;
  activeBlockIndex = -1;
  originalPositions: { top: number; left: number }[] = [];

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
        blockElem.nativeElement.style.top = `${block.top}px`;
        blockElem.nativeElement.style.left = `${block.left}px`;
        blockElem.nativeElement.style.position = 'absolute';
        blockElem.nativeElement.style.transform = `scale(${this.scale})`;
      });
    }
  }

  updateBlockStyle(index: number, topOffset: number, leftOffset: number, scale: number) {
    
    const targetBlock = this.blocks[index];
    targetBlock.top += topOffset;
    targetBlock.left += leftOffset;
    targetBlock.scale = scale;
    
    const targetBlockElem = this.blockElements.get(index);
    if (targetBlockElem) {
      targetBlockElem.nativeElement.style.top = `${targetBlock.top}px`;
      targetBlockElem.nativeElement.style.left = `${targetBlock.left}px`;
      targetBlockElem.nativeElement.style.position = 'absolute';
      targetBlockElem.nativeElement.style.transform = `scale(${scale})`;
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    if (targetElement.className === 'block') {
      this.isMouseDown = true;
      this.activeBlockIndex = Array.from(targetElement.parentNode!.children).indexOf(targetElement);

      this.startMouseX = event.clientX;
      this.startMouseY = event.clientY;
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isMouseDown = false;
    this.activeBlockIndex = -1;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isMouseDown && this.activeBlockIndex !== -1) {
      const deltaX = (event.clientX - this.startMouseX);
      const deltaY = (event.clientY - this.startMouseY);
      const targetBlock = this.blocks[this.activeBlockIndex];

      this.startMouseX = event.clientX;
      this.startMouseY = event.clientY;

      targetBlock.left += deltaX;
      targetBlock.top += deltaY;

      this.setBlockStyles();
    }
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    const zoomIntensity = 0.1
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const oldScale = this.scale;

    if (event.deltaY > 0) {
      this.scale = Math.max(0.7, this.scale - zoomIntensity);
    } else {
      this.scale = Math.min(1.5, this.scale + zoomIntensity);
    }
    
    const scaleFactor = this.scale / oldScale;
    this.blocks.forEach(block => {
      block.left = mouseX + (block.left - mouseX) * scaleFactor;
      block.top = mouseY + (block.top - mouseY) * scaleFactor;
    });

    this.setBlockStyles();
  }
}
