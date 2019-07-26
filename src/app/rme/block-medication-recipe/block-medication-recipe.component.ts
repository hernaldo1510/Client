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

defineLocale('es', esLocale);

@Component({
  selector: 'app-block-medication-recipe',
  templateUrl: './block-medication-recipe.component.html',
  styleUrls: ['./block-medication-recipe.component.scss'],
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
export class BlockMedicationRecipeComponent implements OnInit {
  @Input() item: any;
  @Input() index: number;

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
    this.localeService.use('es');
    this.frecuencyUnit = this.apiRme.frecuencyUnit;
    this.durationType = this.apiRme.durationType;
    this.posologyType = this.apiRme.posologyType;
    this.dataSourceRecommendation = Observable.create((observer: any) => {
      observer.next(this.asyncSelectedRecommendation);
    }).pipe(
      mergeMap((token: string) => this.apiMed.getByComercialName$(token))
    );
  }

  changeTypeaheadLoadingRecommendation(e: boolean): void {
    this.typeaheadLoadingRecommendation = e;
  }

  typeaheadOnSelectRecommendation(e: TypeaheadMatch): void {
    this.asyncSelectedRecommendation = '';
    this.apiRme.setComercialRecommendation(this.index, e.item);
  }

  changeTypeaheadNoResultsRecommendation(event: boolean): void {
    this.typeaheadNoResultsRecommendation = event;
  }

  delMedication() {
    this.apiRme.delMedication(this.index);
  }
}
