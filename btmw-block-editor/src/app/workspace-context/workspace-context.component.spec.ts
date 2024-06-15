import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceContextComponent } from './workspace-context.component';

describe('WorkspaceContextComponent', () => {
  let component: WorkspaceContextComponent;
  let fixture: ComponentFixture<WorkspaceContextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkspaceContextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkspaceContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
