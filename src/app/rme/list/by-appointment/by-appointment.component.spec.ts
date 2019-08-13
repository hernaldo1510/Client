import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ByAppointmentComponent } from './by-appointment.component';

describe('ByAppointmentComponent', () => {
  let component: ByAppointmentComponent;
  let fixture: ComponentFixture<ByAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ByAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ByAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
