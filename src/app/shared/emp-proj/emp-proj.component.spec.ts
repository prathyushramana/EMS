import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpProjComponent } from './emp-proj.component';

describe('EmpProjComponent', () => {
  let component: EmpProjComponent;
  let fixture: ComponentFixture<EmpProjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpProjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpProjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
