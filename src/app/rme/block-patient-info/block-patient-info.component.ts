import { Component, OnInit, Input } from '@angular/core';
import { PatientService } from '@app/_service/patient.service';

@Component({
  selector: 'app-block-patient-info',
  templateUrl: './block-patient-info.component.html',
  styleUrls: ['./block-patient-info.component.scss']
})
export class BlockPatientInfoComponent implements OnInit {
  @Input() patId: any;
  patient: any;
  message = 'No pudimos cargar el paciente';

  constructor(private apiPat: PatientService) {}

  ngOnInit() {
    this.apiPat.getById$(this.patId).subscribe(res => {
      this.patient = res;
    });
  }
}
