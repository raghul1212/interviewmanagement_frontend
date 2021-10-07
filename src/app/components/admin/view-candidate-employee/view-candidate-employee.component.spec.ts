import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCandidateEmployeeComponent } from './view-candidate-employee.component';

describe('ViewCandidateEmployeeComponent', () => {
  let component: ViewCandidateEmployeeComponent;
  let fixture: ComponentFixture<ViewCandidateEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewCandidateEmployeeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCandidateEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
