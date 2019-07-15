import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockProfessionalComponent } from './block-professional.component';

describe('BlockProfessionalComponent', () => {
  let component: BlockProfessionalComponent;
  let fixture: ComponentFixture<BlockProfessionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockProfessionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
