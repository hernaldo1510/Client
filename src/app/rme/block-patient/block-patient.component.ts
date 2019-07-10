import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { RmeService } from '@app/_service/rme.service';

@Component({
  selector: 'app-block-patient',
  templateUrl: './block-patient.component.html',
  styleUrls: ['./block-patient.component.scss']
})
export class BlockPatientComponent implements OnInit {
  isLoading = true;
  patient$: Observable<any>;
  patient: any;
  message = 'No pudimos cargar el paciente';
  patEmail: string;

  constructor(private apiRme: RmeService) { }

  ngOnInit() {
    this.patient$ = this.apiRme.patient;
    this.patient$.subscribe(res => {
      this.patient = res;
    });
  }

  updateEmail(event) {
    console.log(event);
  }
}
