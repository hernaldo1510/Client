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
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  environment
} from 'environments/environment';
import { AuthService } from '@app/_service/auth.service';

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
  public isShowForm = false;
  public isSent = false;
  public loading = false;
  public motivos = environment.messageReasons;
  contactForm: FormGroup;

  constructor(private apiAuth: AuthService) {}

  ngOnInit() {
    this.contactForm = new FormGroup({
      reason: new FormControl(this.motivos[0]),
      message: new FormControl('', {
        validators: [Validators.required]
      })
    });
  }

  showForm() {
    this.isShowForm = !this.isShowForm;
    if (this.isShowForm) {
      this.loading = false;
    }
  }

  changeReason(e) {
    this.contactForm.controls.reason.setValue(e.target.value, {
      onlySelf: true
    });
  }

  onSubmit({
    value,
    valid
  }: {
    value; valid: boolean
  }) {
    console.log(value);
    const pro = this.apiAuth.getProfessionalData();
    console.log(pro);
    this.loading = true;
    this.isSent = false;
    this.isShowForm = false;
    setTimeout(() => {
      this.isSent = true;
      this.loading = false;
      setTimeout(() => {
        this.contactForm.controls.message.setValue('');
        this.isSent = false;
      }, 2000);
    }, 1000);
  }
}
