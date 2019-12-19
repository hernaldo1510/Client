import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { RmeService } from '@app/_service/rme.service';
import {
  trigger,
  state,
  transition,
  style,
  animate
} from '@angular/animations';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalRecipeComponent } from '@app/rme/modal-recipe/modal-recipe.component';
import { AuthService } from '@app/_service/auth.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-by-professional',
  templateUrl: './by-professional.component.html',
  styleUrls: ['./by-professional.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          opacity: 0
        })
      ),
      transition('void <=> *', animate(300))
    ]),
    trigger('fadeIn', [
      state(
        'void',
        style({
          opacity: 0
        })
      ),
      transition('void => *', animate(300))
    ])
  ]
})
export class ByProfessionalComponent implements OnInit {
  bsModalRef: BsModalRef;
  loadingIndicator = true;
  tableMsg = environment.tableMsg;
  rmeList = [];
  temp = [];

  @ViewChild(DatatableComponent) table: DatatableComponent;
  scrollBarHorizontal = window.innerWidth < 960;
  columnModeSetting = window.innerWidth < 960 ? 'standard' : 'force';

  constructor(
    private route: ActivatedRoute,
    private apiRme: RmeService,
    private auth: AuthService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.apiRme.findByProfessional(this.auth.getProfessional()).subscribe((res: any) => {
      this.rmeList = res;
      this.temp = [...res];
      this.loadingIndicator = false;
    });
  }

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(d => {
      return (
        (d &&
          JSON.stringify(d)
            .toLowerCase()
            .indexOf(val) > -1) ||
        !val
      );
    });

    this.rmeList = temp;
    this.table.offset = 0;
  }

  showRme(idRme: any) {
    const initialState = { id: idRme };
    this.bsModalRef = this.modalService.show(ModalRecipeComponent, {
      initialState,
      class: 'stick-up modal-xl'
    });
  }
}
