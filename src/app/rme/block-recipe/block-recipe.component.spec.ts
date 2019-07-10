import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockRecipeComponent } from './block-recipe.component';

describe('BlockRecipeComponent', () => {
  let component: BlockRecipeComponent;
  let fixture: ComponentFixture<BlockRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockRecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
