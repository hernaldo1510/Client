import { Component, OnInit } from '@angular/core';
import { RmeService } from '@app/_service/rme.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
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
export class ViewComponent implements OnInit {
  id: any;
  loading = true;
  showPdf = false;
  msg: string;
  pdfRme: any;

  constructor(private apiRme: RmeService, private sanitizer: DomSanitizer, private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.apiRme.getById(this.id).subscribe(
      res => {
        if (res !== false) {
          this.loading = false;
          this.showPdf = true;
          this.pdfRme = this.sanitizer.bypassSecurityTrustResourceUrl(
            'data:application/pdf;base64,' + res
          );
        } else {
          this.loading = false;
          this.showPdf = false;
          this.msg = 'No pudimos cargar la receta, por favor intente nuevamente';  
        }
      },
      err => {
        this.loading = false;
        this.showPdf = false;
        this.msg = 'No pudimos cargar la receta, por favor intente nuevamente';
      }
    );
  }
}
