import { FormArray, FormControl } from '@angular/forms';
import { Rme } from './rme';

export class RmeForm {
  indications = new FormArray([]);

  constructor(rme: Rme) {
    if (rme.indications) {
      this.indications.setValue(rme.indications);
    }
  }
}
