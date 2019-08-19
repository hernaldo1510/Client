import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ByProfessionalComponent } from './by-professional.component';

describe('ByProfessionalComponent', () => {
  let component: ByProfessionalComponent;
  let fixture: ComponentFixture<ByProfessionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ByProfessionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ByProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
