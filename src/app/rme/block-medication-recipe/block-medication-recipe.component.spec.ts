import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockMedicationRecipeComponent } from './block-medication-recipe.component';

describe('BlockMedicationRecipeComponent', () => {
  let component: BlockMedicationRecipeComponent;
  let fixture: ComponentFixture<BlockMedicationRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockMedicationRecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockMedicationRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
