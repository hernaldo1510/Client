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
    const token = this.route.snapshot.paramMap.get('token');
    if (token) {
      this.auth.setToken(token);
      this.auth.setProfessional(pro);
      this.professional$ = this.apiPro.getById$(pro);
      this.professional$.subscribe(
        res => {
          // console.log(res);
          this.apiRme.setProfessional(res);
          // this.router.navigateByUrl('/session/error');
          switch (this.route.snapshot.url[1].path) {
            case 'rme':
              this.goToRme();
              break;
            default:
              this.goToError();
              break;
          }
        },
        err => {
          // console.log(err);
          // this.goToError();
          this.goToRme();
        }
      );
    }
  }

  goToError() {
    this.apiRme.setProfessional(-1);
    this.router.navigateByUrl('/session/error');
  }

  goToRme() {
    console.log('goToRme');
    const pat = this.route.snapshot.paramMap.get('pat');
    const appoId = this.route.snapshot.paramMap.get('appo');
    const bdup = this.route.snapshot.paramMap.get('bdup');
    switch (this.route.snapshot.url[2].path) {
      case 'new':
        if (appoId) {
          console.log('rme new con appo');
          this.router.navigate(['rme', 'new', 'pat', pat, 'appo', appoId]);
        } else {
          console.log('rme new sin appo');
          this.router.navigate(['rme', 'new', 'pat', pat]);
        }
        break;
      case 'list':
        if (appoId) {
          console.log('rme list by appo');
          this.router.navigate(['rme', 'list', 'pat', pat, 'appo', appoId]);
        } else if (pat) {
          console.log('rme list by pat');
          this.router.navigate(['rme', 'list', 'pat', pat]);
        }
        break;
      default:
        this.goToError();
        break;
    }
  }
}
