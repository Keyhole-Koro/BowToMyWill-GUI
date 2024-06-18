import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresetMenuBufBlockComponent } from './preset-menu-buf-block.component';

describe('PresetMenuBufBlockComponent', () => {
  let component: PresetMenuBufBlockComponent;
  let fixture: ComponentFixture<PresetMenuBufBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresetMenuBufBlockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PresetMenuBufBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
