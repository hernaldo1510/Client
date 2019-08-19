import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '@app/_service/patient.service';
import { RmeService } from '@app/_service/rme.service';
import { isUndefined } from 'util';
import { Observable } from 'rxjs';
import {
  trigger,
  state,
  transition,
  style,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-by-appointment',
  templateUrl: './by-appointment.component.html',
  styleUrls: ['./by-appointment.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          opacity: 0
        })
      ),
      transition('void <=> *', animate(300))
    ]),
    trigger('fadeIn', [
      state(
        'void',
        style({
          opacity: 0
        })
      ),
      transition('void => *', animate(300))
    ])
  ]
})
export class ByAppointmentComponent implements OnInit {
  loading = true;
  appoId: string;
  patId: string;
  msg: string;
  rmeList = [];

  constructor(
    private route: ActivatedRoute,
    private apiPat: PatientService,
    private apiRme: RmeService
  ) {}

  ngOnInit() {
    this.appoId = this.route.snapshot.paramMap.get('appo');
    this.patId = this.route.snapshot.paramMap.get('pat');
    if (!isUndefined(this.appoId)) {
      this.apiRme.findByAppointment(this.appoId, this.patId).subscribe((res: any) => {
        this.loading = false;
        this.rmeList = res;
        this.msg = (this.rmeList.length === 0) ? 'No encontramos recetas para la cita' : '';
      });
    } else {
      this.loading = false;
      this.msg = 'Debe indicar una cita';
    }
  }
}
