import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeManageInterviewComponent } from './employee-manage-interview.component';

describe('EmployeeManageInterviewComponent', () => {
  let component: EmployeeManageInterviewComponent;
  let fixture: ComponentFixture<EmployeeManageInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeManageInterviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeManageInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
