import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceBlockComponent } from './workspace-block.component';

describe('WorkspaceBlockComponent', () => {
  let component: WorkspaceBlockComponent;
  let fixture: ComponentFixture<WorkspaceBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkspaceBlockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkspaceBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
