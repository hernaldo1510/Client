import { Component, OnInit } from '@angular/core';
import { RmeService } from '@app/_service/rme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-block-frequent-med',
  templateUrl: './block-frequent-med.component.html',
  styleUrls: ['./block-frequent-med.component.scss']
})
export class BlockFrequentMedComponent implements OnInit {
  isLoading = true;
  medicationHighFrequency$: Observable<any>;
  medicationHighFrequency: any;
  message = 'No pudimos cargar los medicamentos frecuentes';
  patEmail: string;

  constructor(private apiRme: RmeService) { }

  ngOnInit() {
    this.medicationHighFrequency$ = this.apiRme.medicationHighFrequency;
    this.medicationHighFrequency$.subscribe(res => {
      // console.log(res);
      if (res !== false) {
        this.isLoading = false;
        this.medicationHighFrequency = res;
      }
    });
  }

  addToRme() {
    const toAdd = this.medicationHighFrequency.filter(res => res.checked);
    // console.log(toAdd);
    toAdd.forEach(res => {
      // console.log(res);
      this.apiRme.addFrecuent(res);
      res.checked = false;
    });
  }
}
