import { Component, OnInit, ViewChild } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Observable, Subscription } from 'rxjs';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MedicationService } from '@app/_service/medication.service';
import { Medication } from '@app/_model/medication';
import { RmeService } from '@app/_service/rme.service';
import { FormGroup, FormArray } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { defaultOptions } from 'ngx-extended-pdf-viewer';
import { PatientService } from '@app/_service/patient.service';

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

  rmeForm: FormGroup;
  rmeFormSub: Subscription;
  formInvalid = false;
  indications: FormArray;
  patient$: Observable<any>;
  patient: any;

  @ViewChild('modalRme') modalRme: ModalDirective;
  showPdf: boolean;
  isLoadingModal: boolean;
  pdfRme: any;
  preview = true;


  constructor(private apiMed: MedicationService, private apiRme: RmeService, private sanitizer: DomSanitizer) {
    defaultOptions.workerSrc = './assets/pdf.worker-es5.js';
  }

  ngOnInit() {
    this.patient$ = this.apiRme.patient;
    this.patient$.subscribe(res => {
      this.patient = res;
    });
    this.receta = this.apiRme.medList;
    this.dataSource = Observable.create((observer: any) => {
      observer.next(this.asyncSelected);
    }).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((token: string) => this.apiMed.getByActiveIngredient$(token))
    );

    this.rmeFormSub = this.apiRme.rmeForm.subscribe((res: any) => {
      this.rmeForm = res;
      this.indications = this.rmeForm.get('indications') as FormArray;
    });
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

  hasMedications() {
    return this.apiRme.hasMedications();
  }

  save(preview = false) {
    this.showPdf = false;
    this.isLoadingModal = true;
    this.modalRme.show();
    this.preview = preview;
    this.apiRme.saveNew(preview).subscribe(res => {
      this.isLoadingModal = false;
      if (res.code === '200') {
        // this.pdfRme = this.sanitizer.bypassSecurityTrustResourceUrl(res.url);
        // console.log(res.url);
        this.pdfRme = res.url;
        this.showPdf = true;
      } else {
        this.showPdf = false;
      }
    });
  }
}
