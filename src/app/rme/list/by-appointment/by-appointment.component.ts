import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-by-appointment',
  templateUrl: './by-appointment.component.html',
  styleUrls: ['./by-appointment.component.scss']
})
export class ByAppointmentComponent implements OnInit {
  appoId: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.appoId = this.route.snapshot.paramMap.get('appo');
  }

}
