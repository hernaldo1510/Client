import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { PatientService } from '@app/_service/patient.service';
import { RmeService } from '@app/_service/rme.service';
import { isUndefined } from 'util';
import {
  trigger,
  state,
  transition,
  style,
  animate
} from '@angular/animations';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalRecipeComponent } from '@app/rme/modal-recipe/modal-recipe.component';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-by-patient',
  templateUrl: './by-patient.component.html',
  styleUrls: ['./by-patient.component.scss'],
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
export class ByPatientComponent implements OnInit {
  bsModalRef: BsModalRef;
  pat: string;
  loadingIndicator = true;
  tableMsg = environment.tableMsg;
  rmeList = [];
  temp = [];

  @ViewChild(DatatableComponent) table: DatatableComponent;
  scrollBarHorizontal = window.innerWidth < 960;
  columnModeSetting = window.innerWidth < 960 ? 'standard' : 'force';

  constructor(
    private route: ActivatedRoute,
    private apiPat: PatientService,
    private apiRme: RmeService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.pat = this.route.snapshot.paramMap.get('pat');
    if (!isUndefined(this.pat)) {
      this.apiRme.findByPatient(this.pat).subscribe((res: any) => {
        this.rmeList = res;
        this.temp = [...res];
        this.loadingIndicator = false;
      });
    }
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
      class: 'stick-up modal-lg'
    });
  }
}
