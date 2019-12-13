import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingHelpComponent } from './floating-help.component';

describe('FloatingHelpComponent', () => {
  let component: FloatingHelpComponent;
  let fixture: ComponentFixture<FloatingHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloatingHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
