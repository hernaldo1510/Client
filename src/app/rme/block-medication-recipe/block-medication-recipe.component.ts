import { Component, OnInit, Input } from '@angular/core';
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
  styleUrls: ['./block-medication-recipe.component.scss']
})
export class BlockMedicationRecipeComponent implements OnInit {
  @Input() item: any;
  @Input() index: number;

  asyncSelectedRecomendation: string;
  typeaheadLoadingRecomendation: boolean;
  typeaheadNoResultsRecomendation: boolean;
  dataSourceRecomendation: Observable<any>;
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
    this.dataSourceRecomendation = Observable.create((observer: any) => {
      observer.next(this.asyncSelectedRecomendation);
    }).pipe(
      mergeMap((token: string) => this.apiMed.getByComercialName$(token))
    );
  }

  changeTypeaheadLoadingRecomendation(e: boolean): void {
    this.typeaheadLoadingRecomendation = e;
  }

  typeaheadOnSelectRecomendation(e: TypeaheadMatch): void {
    this.asyncSelectedRecomendation = '';
    this.apiRme.setComercialRecomendation(this.index, e.item);
  }

  changeTypeaheadNoResultsRecomendation(event: boolean): void {
    this.typeaheadNoResultsRecomendation = event;
  }

  delMedication() {
    this.apiRme.delMedication(this.index);
  }
}
