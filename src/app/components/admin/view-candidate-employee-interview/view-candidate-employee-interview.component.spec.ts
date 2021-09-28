import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCandidateEmployeeInterviewComponent } from './view-candidate-employee-interview.component';

describe('ViewCandidateEmployeeInterviewComponent', () => {
  let component: ViewCandidateEmployeeInterviewComponent;
  let fixture: ComponentFixture<ViewCandidateEmployeeInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCandidateEmployeeInterviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCandidateEmployeeInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
