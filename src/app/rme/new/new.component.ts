import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { ProfessionalService } from '@app/_service/professional.service';
import { PatientService } from '@app/_service/patient.service';
import { RmeService } from '@app/_service/rme.service';
import { ModalDirective } from 'ngx-bootstrap';
import { MedicationService } from '@app/_service/medication.service';
import { AuthService } from '@app/_service/auth.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  professional$: Observable<any>;
  professional: Observable<any>;
  patient$: Observable<any>;
  patient: Observable<any>;
  medFreq$: Observable<any>;
  medFreq: Observable<any>;
  preview = true;

  @ViewChild('modalRme') modalRme: ModalDirective;
  showPdf: boolean;
  isLoadingModal: boolean;
  pdfRme: any;

  constructor(
    private route: ActivatedRoute,
    private apiPro: ProfessionalService,
    private apiPat: PatientService,
    private apiRme: RmeService,
    private apiMed: MedicationService,
    private auth: AuthService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    const pro = this.route.snapshot.paramMap.get('pro');
    const pat = this.route.snapshot.paramMap.get('pat');
    const appoId = this.route.snapshot.paramMap.get('appo');
    const token = this.route.snapshot.paramMap.get('token');
    if (appoId) {
      this.apiRme.setAppointment(appoId);
    }
    if (token) {
      this.auth.setToken(token);
      this.professional$ = this.apiPro.getById$(pro);
      this.patient$ = this.apiPat.getById$(pat);
      this.medFreq$ = this.apiMed.getHighFrequencyByProfessional$(pro);
      this.professional = this.apiRme.professional;
      this.professional$.subscribe(
        res => {
          this.apiRme.setProfessional(res);
        },
        err => {
          this.apiRme.setProfessional(-1);
        }
      );
      this.patient$.subscribe(
        res => {
          this.apiRme.setPatient(res);
        },
        err => {
          this.apiRme.setPatient(-1);
        }
      );
      this.medFreq$.subscribe(res => {
        this.apiRme.setMedicationHighFrequency(res);
      }, err => {});
    }
  }

  hasMedications() {
    return this.apiRme.hasMedications();
  }

  save(preview = false) {
    this.showPdf = false;
    this.isLoadingModal = true;
    this.modalRme.show();
    this.preview = preview;
    this.apiRme.save(preview).subscribe(res => {
      // console.log(res);
      this.isLoadingModal = false;
      if (res.code === '200') {
        this.pdfRme = this.sanitizer.bypassSecurityTrustResourceUrl(res.url);
        this.showPdf = true;
      } else {
        this.showPdf = false;
      }
    });
  }
}
