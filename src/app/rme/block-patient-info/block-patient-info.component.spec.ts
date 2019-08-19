import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockPatientInfoComponent } from './block-patient-info.component';

describe('BlockPatientInfoComponent', () => {
  let component: BlockPatientInfoComponent;
  let fixture: ComponentFixture<BlockPatientInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockPatientInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockPatientInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
