import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Observable, of } from 'rxjs';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { mergeMap } from 'rxjs/operators';
import { MedicationService } from '@app/_service/medication.service';
import { Medication } from '@app/_model/medication';
import { RmeService } from '@app/_service/rme.service';

@Component({
  selector: 'app-block-recipe',
  templateUrl: './block-recipe.component.html',
  styleUrls: ['./block-recipe.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          opacity: 0
        })
      ),
      transition('void <=> *', animate(250))
    ]),
    trigger('fadeIn', [
      state(
        'void',
        style({
          opacity: 0
        })
      ),
      transition('void => *', animate(250))
    ])
  ]
})
export class BlockRecipeComponent implements OnInit {
  asyncSelected: string;
  typeaheadLoading: boolean;
  typeaheadNoResults: boolean;
  dataSource: Observable<any>;
  receta: Observable<Medication[]>;

  constructor(private apiMed: MedicationService, private apiRme: RmeService) {}

  ngOnInit() {
    this.receta = this.apiRme.medList;
    this.dataSource = Observable.create((observer: any) => {
      observer.next(this.asyncSelected);
    }).pipe(
      mergeMap((token: string) => this.apiMed.getByActiveIngredient$(token))
    );
  }

  filterResults(token: string) {
    return this.apiMed.getByActiveIngredient$(token);
  }

  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  typeaheadOnSelect(e: TypeaheadMatch): void {
    this.asyncSelected = '';
    this.apiRme.addMedication(e.item);
  }

  changeTypeaheadNoResults(event: boolean): void {
    this.typeaheadNoResults = event;
  }
}
