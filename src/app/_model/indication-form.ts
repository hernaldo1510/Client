import { Indication } from './indication';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';

export class IndicationForm {
  medication: any;
  duration: FormGroup;
  frecuency: FormGroup;
  posology: FormGroup;
  observations: FormControl;
  commercialRecommendation: FormControl;
  commercialRecommendationForm: FormControl;
  indicationStartDate: FormControl;
  fb = new FormBuilder();

  constructor(ind: Indication) {
    this.medication = ind.medication;
    this.commercialRecommendation = new FormControl(ind.commercialRecommendation);
    this.commercialRecommendationForm = new FormControl();
    this.duration = this.fb.group({
      unit: new FormControl(ind.duration.unit),
      value: new FormControl(ind.duration.value, {
        validators: [Validators.required]
      })
    });
    this.frecuency = this.fb.group({
      unit: new FormControl(ind.frecuency.unit),
      value: new FormControl(ind.frecuency.value, {
        validators: [Validators.required]
      })
    });
    this.posology = this.fb.group({
      unit: new FormControl(ind.posology.unit),
      value: new FormControl(ind.posology.value, {
        validators: [Validators.required]
      })
    });
    this.observations = new FormControl(ind.observations);
    this.indicationStartDate = new FormControl(ind.indicationStartDate);
  }
}
