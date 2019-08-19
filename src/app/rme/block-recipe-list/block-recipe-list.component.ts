import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ModalRecipeComponent } from '../modal-recipe/modal-recipe.component';

@Component({
  selector: 'app-block-recipe-list',
  templateUrl: './block-recipe-list.component.html',
  styleUrls: ['./block-recipe-list.component.scss']
})
export class BlockRecipeListComponent implements OnInit {
  @Input() data: any;
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) {}

  ngOnInit() {}

  showRme(idRme: any) {
    const initialState = { id: idRme };
    this.bsModalRef = this.modalService.show(ModalRecipeComponent, {
      initialState,
      class: 'stick-up modal-lg'
    });
  }
}
