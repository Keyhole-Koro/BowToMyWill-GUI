import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresetMenuContextComponent } from './preset-menu-context.component';

describe('PresetMenuContextComponent', () => {
  let component: PresetMenuContextComponent;
  let fixture: ComponentFixture<PresetMenuContextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresetMenuContextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PresetMenuContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
