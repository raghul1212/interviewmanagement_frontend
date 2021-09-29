import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInterviewComponent } from './manage-interview.component';

describe('ManageInterviewComponent', () => {
  let component: ManageInterviewComponent;
  let fixture: ComponentFixture<ManageInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageInterviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
