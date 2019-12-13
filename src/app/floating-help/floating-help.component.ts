import {
  Component,
  OnInit
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-floating-help',
  templateUrl: './floating-help.component.html',
  styleUrls: ['./floating-help.component.scss'],
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
export class FloatingHelpComponent implements OnInit {
  public isShowForm: boolean;

  constructor() {}

  ngOnInit() {}

  showForm() {
    this.isShowForm = !this.isShowForm;
  }

}
