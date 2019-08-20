import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { RmeService } from '@app/_service/rme.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-modal-recipe',
  templateUrl: './modal-recipe.component.html',
  styleUrls: ['./modal-recipe.component.scss'],
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
export class ModalRecipeComponent implements OnInit {
  id: any;
  loading = true;
  showPdf = false;
  msg: string;
  pdfRme: any;

  constructor(
    public bsModalRef: BsModalRef,
    private apiRme: RmeService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.apiRme.getById(this.id).subscribe(
      res => {
        this.loading = false;
        this.showPdf = true;
        this.pdfRme = this.sanitizer.bypassSecurityTrustResourceUrl(
          'data:application/pdf;base64,' + res
        );
      },
      err => {
        this.loading = false;
        this.showPdf = false;
        this.msg = 'No pudimos cargar la receta, por favor intente nuevamente';
      }
    );
  }
}
