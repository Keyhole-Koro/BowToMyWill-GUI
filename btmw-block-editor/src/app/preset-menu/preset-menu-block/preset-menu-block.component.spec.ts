import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresetMenuBlockComponent } from './preset-menu-block.component';

describe('PresetMenuBlockComponent', () => {
  let component: PresetMenuBlockComponent;
  let fixture: ComponentFixture<PresetMenuBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresetMenuBlockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PresetMenuBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
