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
    // console.log(ind);
    this.medication = ind.medication;
    this.commercialRecommendation = new FormControl(ind.commercialRecommendation);
    this.commercialRecommendationForm = new FormControl();
    this.duration = this.fb.group({
      unit: new FormControl(ind.duration.unit),
      value: new FormControl(ind.duration.value)
    });
    if (ind.duration.unit === 'Diario' || ind.duration.unit === 'Mensual' || ind.duration.unit === 'Semanal') {
      this.duration.get('value').setValidators([Validators.required]);
    }
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
    this.duration.get('unit').valueChanges.subscribe(res => {
      // console.log(res);
      if (res === 'Diario' || res === 'Mensual' || res === 'Semanal') {
        this.duration.get('value').setValidators([Validators.required]);
      } else {
        this.duration.get('value').setValidators([]);
      }
      this.duration.get('value').updateValueAndValidity();
    });
  }
}
