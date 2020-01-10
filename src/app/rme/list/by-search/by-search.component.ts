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
import { isUndefined } from 'util';

@Component({
  selector: 'app-by-search',
  templateUrl: './by-search.component.html',
  styleUrls: ['./by-search.component.scss'],
})
export class BySearchComponent implements OnInit {
  professional$: Observable<any>;
  professional: Observable<any>;
  patient$: Observable<any>;
  patient: Observable<any>;
  medFreq$: Observable<any>;
  medFreq: Observable<any>;
  preview = true;
  pat: string;
  loadingIndicator = true;
  rmeList = [];
  temp = [];
  public alertMessage;

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
  this.patient$ = this.apiRme.patient;
  this.patient$.subscribe(res => {
    this.patient = res;
  });
}
  onSubmit() {
    // const pro = this.route.snapshot.paramMap.get('pro');
   /*  const pat = this.route.snapshot.paramMap.get('pat'); */
    const appoId = this.route.snapshot.paramMap.get('appo');
    // const token = this.route.snapshot.paramMap.get('token');
    if (appoId) {
      this.apiRme.setAppointment(appoId);
    } else {
      this.apiRme.setAppointment(false);
    }
    // if (token) {
    // this.auth.setToken(token);
    // this.professional$ = this.apiPro.getById$(pro);
    if (this.auth.getProfessional()) {
      this.patient$ = this.apiPat.getById$(this.pat);
      this.professional$ = this.apiPro.getById$(this.auth.getProfessional());
      this.medFreq$ = this.apiMed.getHighFrequencyByProfessional$(
        this.auth.getProfessional()
      );

      this.professional$.subscribe(
        res => {
          this.apiRme.setProfessional(res);
          this.auth.setProfessionalData(res);
        },
        err => {
          this.apiRme.setProfessional(-1);
        }
      );
      this.patient$.subscribe(
        res => {
          this.apiRme.setPatient(res);
          if (res === 'not found') {
            this.alertMessage = '¡Rut de paciente no registrado!';
          }

        },
        err => {
          this.apiRme.setPatient(-1);
        }
      );
      this.medFreq$.subscribe(
        res => {
          this.apiRme.setMedicationHighFrequency(res);
        },
        err => {
          this.apiRme.setMedicationHighFrequency(-1);
        }
      );
    }
    // this.professional$.subscribe(res => {
    //   console.log('new.professional', res);
    //   if (res === false) {
    //     const pro = this.auth.getProfessional();
    //     console.log('local.professional', pro);
    //     if (pro !== null && pro !== false) {
    //       // this.apiRme.setProfessional(pro);
    //       console.log('cargar pro', pro)
    //       this.apiPro.getById$(pro).subscribe(res => {
    //         this.apiRme.setProfessional(res);
    //         this.medFreq$ = this.apiMed.getHighFrequencyByProfessional$(
    //           res._run
    //         );
    //       });
    //     } else {
    //       this.apiRme.setProfessional(-1);
    //     }
    //   } else {
    //     this.medFreq$ = this.apiMed.getHighFrequencyByProfessional$(res._run);
    //   }
    //   this.medFreq$.subscribe(
    //     res => {
    //       this.apiRme.setMedicationHighFrequency(res);
    //     },
    //     err => {
    //       this.apiRme.setMedicationHighFrequency(-1);
    //     }
    //   );
    // });
  }

  hasMedications() {
    return this.apiRme.hasMedications();
  }

  // save(preview = false) {
  //   this.showPdf = false;
  //   this.isLoadingModal = true;
  //   this.modalRme.show();
  //   this.preview = preview;
  //   this.apiRme.save(preview).subscribe(res => {
  //     // console.log(res);
  //     this.isLoadingModal = false;
  //     if (res.code === '200') {
  //       this.pdfRme = this.sanitizer.bypassSecurityTrustResourceUrl(res.url);
  //       this.showPdf = true;
  //     } else {
  //       this.showPdf = false;
  //     }
  //   });
  // }

}
