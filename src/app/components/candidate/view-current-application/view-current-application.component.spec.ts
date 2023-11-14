import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCurrentApplicationComponent } from './view-current-application.component';

describe('ViewCurrentApplicationComponent', () => {
  let component: ViewCurrentApplicationComponent;
  let fixture: ComponentFixture<ViewCurrentApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewCurrentApplicationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCurrentApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
