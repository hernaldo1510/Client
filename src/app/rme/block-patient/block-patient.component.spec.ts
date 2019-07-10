import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockPatientComponent } from './block-patient.component';

describe('BlockPatientComponent', () => {
  let component: BlockPatientComponent;
  let fixture: ComponentFixture<BlockPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
