import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockRecipeListComponent } from './block-recipe-list.component';

describe('BlockRecipeListComponent', () => {
  let component: BlockRecipeListComponent;
  let fixture: ComponentFixture<BlockRecipeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockRecipeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockRecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
