import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

import { MedicationService } from '@app/_service/medication.service';
import { Medication } from '@app/_model/medication';
import { RmeService } from '@app/_service/rme.service';
import { FormGroup } from '@angular/forms';

defineLocale('es', esLocale);

@Component({
  selector: 'app-block-recipe-indication',
  templateUrl: './block-recipe-indication.component.html',
  styleUrls: ['./block-recipe-indication.component.scss'],
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
export class BlockRecipeIndicationComponent implements OnInit {
  @Input() index: number;
  @Input() indForm: FormGroup;

  asyncSelectedRecommendation: string;
  typeaheadLoadingRecommendation: boolean;
  typeaheadNoResultsRecommendation: boolean;
  dataSourceRecommendation: Observable<any>;
  minDate = new Date();
  frecuencyUnit = [];
  durationType = [];
  posologyType = [];

  constructor(
    private apiMed: MedicationService,
    private apiRme: RmeService,
    private localeService: BsLocaleService
  ) {}

  ngOnInit() {
    // console.log(this.indForm);
    this.localeService.use('es');
    this.frecuencyUnit = this.apiRme.frecuencyUnit;
    this.durationType = this.apiRme.durationType;
    this.posologyType = this.apiRme.posologyType;
    this.dataSourceRecommendation = Observable.create((observer: any) => {
      observer.next(this.indForm.controls.commercialRecommendationForm.value);
    }).pipe(
      mergeMap((token: string) => this.apiMed.getByComercialName$(token))
    );
  }

  changeTypeaheadLoadingRecommendation(e: boolean): void {
    this.typeaheadLoadingRecommendation = e;
  }

  typeaheadOnSelectRecommendation(e: TypeaheadMatch): void {
    this.indForm.controls.commercialRecommendationForm.setValue('');
    this.indForm.controls.commercialRecommendation.setValue(e.item);
  }

  changeTypeaheadNoResultsRecommendation(event: boolean): void {
    this.typeaheadNoResultsRecommendation = event;
  }

  delMedication() {
    this.apiRme.delMedicationNew(this.index);
  }
}
