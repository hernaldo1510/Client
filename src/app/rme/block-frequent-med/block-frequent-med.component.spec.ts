import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockFrequentMedComponent } from './block-frequent-med.component';

describe('BlockFrequentMedComponent', () => {
  let component: BlockFrequentMedComponent;
  let fixture: ComponentFixture<BlockFrequentMedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockFrequentMedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockFrequentMedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
