import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessionalService } from '@app/_service/professional.service';
import { PatientService } from '@app/_service/patient.service';
import { RmeService } from '@app/_service/rme.service';
import { MedicationService } from '@app/_service/medication.service';
import { AuthService } from '@app/_service/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss']
})
export class CheckComponent implements OnInit {
  professional$: Observable<any>;
  professional: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private apiPro: ProfessionalService,
    private apiPat: PatientService,
    private apiRme: RmeService,
    private apiMed: MedicationService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const pro = this.route.snapshot.paramMap.get('pro');
    const pat = this.route.snapshot.paramMap.get('pat');
    const appoId = this.route.snapshot.paramMap.get('appo');
    const token = this.route.snapshot.paramMap.get('token');
    if (token) {
      this.auth.setToken(token);
      this.professional$ = this.apiPro.getById$(pro);
      // this.professional = this.apiRme.professional;
      this.professional$.subscribe(
        res => {
          console.log(res);
          this.apiRme.setProfessional(res);
          // this.router.navigateByUrl('/session/error');
          this.router.navigate(['rme', 'new', 'pat', pat, 'appo', appoId]);
        },
        err => {
          console.log(err);
          this.apiRme.setProfessional(-1);
        }
      );
    }
  }
}
