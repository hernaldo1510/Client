import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ByPatientComponent } from './by-patient.component';

describe('ByPatientComponent', () => {
  let component: ByPatientComponent;
  let fixture: ComponentFixture<ByPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ByPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ByPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
