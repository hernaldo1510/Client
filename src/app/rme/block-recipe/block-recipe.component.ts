import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { mergeMap } from 'rxjs/operators';
import { MedicationService } from '@app/_service/medication.service';
import { Medication } from '@app/_model/medication';
import { RmeService } from '@app/_service/rme.service';
defineLocale('es', esLocale);

@Component({
  selector: 'app-block-recipe',
  templateUrl: './block-recipe.component.html',
  styleUrls: ['./block-recipe.component.scss']
})
export class BlockRecipeComponent implements OnInit {
  asyncSelected: string;
  typeaheadLoading: boolean;
  typeaheadNoResults: boolean;
  dataSource: Observable<any>;
  asyncSelectedRecomendation: string;
  typeaheadLoadingRecomendation: boolean;
  typeaheadNoResultsRecomendation: boolean;
  dataSourceRecomendation: Observable<any>;
  frecuencyUnit = [];
  durationType = [];
  posologyType = [];
  minDate = new Date();
  receta: Observable<Medication[]>;

  constructor(private apiMed: MedicationService, private apiRme: RmeService, private localeService: BsLocaleService) {}

  ngOnInit() {
    this.localeService.use('es');
    this.receta = this.apiRme.medList;
    this.frecuencyUnit = this.apiRme.frecuencyUnit;
    this.durationType = this.apiRme.durationType;
    this.posologyType = this.apiRme.posologyType;
    this.dataSource = Observable.create((observer: any) => {
      observer.next(this.asyncSelected);
    }).pipe(
      mergeMap((token: string) => this.apiMed.getByActiveIngredient$(token))
    );

    this.dataSourceRecomendation = Observable.create((observer: any) => {
      observer.next(this.asyncSelectedRecomendation);
    }).pipe(
      mergeMap((token: string) => this.apiMed.getByComercialName$(token))
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

  changeTypeaheadLoadingRecomendation(e: boolean): void {
    this.typeaheadLoadingRecomendation = e;
  }

  typeaheadOnSelectRecomendation(e: TypeaheadMatch, i: number): void {
    this.asyncSelectedRecomendation = '';
    console.log(e.item, i);
    this.apiRme.setComercialRecomendation(i, e.item);
  }

  changeTypeaheadNoResultsRecomendation(event: boolean): void {
    this.typeaheadNoResultsRecomendation = event;
  }

  delMedication(i: number) {
    this.apiRme.delMedication(i);
  }
}
