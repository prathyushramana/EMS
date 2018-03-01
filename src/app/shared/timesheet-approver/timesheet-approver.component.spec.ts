import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetApproverComponent } from './timesheet-approver.component';

describe('TimesheetApproverComponent', () => {
  let component: TimesheetApproverComponent;
  let fixture: ComponentFixture<TimesheetApproverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetApproverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetApproverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
