import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockRecipeIndicationComponent } from './block-recipe-indication.component';

describe('BlockRecipeIndicationComponent', () => {
  let component: BlockRecipeIndicationComponent;
  let fixture: ComponentFixture<BlockRecipeIndicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockRecipeIndicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockRecipeIndicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
