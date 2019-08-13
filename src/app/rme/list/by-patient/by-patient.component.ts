import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-by-patient',
  templateUrl: './by-patient.component.html',
  styleUrls: ['./by-patient.component.scss']
})
export class ByPatientComponent implements OnInit {
  pat: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.pat = this.route.snapshot.paramMap.get('pat');
  }

}
