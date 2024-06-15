import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceGridComponent } from './workspace-grid.component';

describe('WorkspaceGridComponent', () => {
  let component: WorkspaceGridComponent;
  let fixture: ComponentFixture<WorkspaceGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkspaceGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkspaceGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
