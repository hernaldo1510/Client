import { Component, OnInit } from '@angular/core';
import { RmeService } from '@app/_service/rme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-block-professional',
  templateUrl: './block-professional.component.html',
  styleUrls: ['./block-professional.component.scss']
})
export class BlockProfessionalComponent implements OnInit {
  isLoading = true;
  professional$: Observable<any>;
  professional: any;
  message = 'No pudimos cargar el paciente';
  patEmail: string;

  constructor(private apiRme: RmeService) { }

  ngOnInit() {
    this.professional$ = this.apiRme.professional;
    this.professional$.subscribe(res => {
      if (res) {
        this.professional = res;
        if (res.specialities) {
          this.professional.specialitiesSel = res.specialities[0] || {};
        }
      }
    });
  }

}
