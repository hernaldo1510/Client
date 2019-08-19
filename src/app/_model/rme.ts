import { Indication } from './indication';

export class Rme {
  professional: any;
  patient: any;
  id: any;
  preview: boolean;
  appointmentId: any;
  // tslint:disable-next-line: variable-name
  creation_day: any;
  indications: any[];

  constructor(pro?: any, pat?: any, pw?: boolean) {
    this.professional = pro || false;
    this.patient = pat || false;
    this.creation_day = this.getCreationDate();
    this.id = '' + Date.now();
    this.preview = pw;
    this.indications = [];
    console.log(this);
  }

  getCreationDate() {
    const d = new Date();
    const creationDateAux =
      ('0' + d.getDate()).slice(-2) +
      '/' +
      ('0' + (d.getMonth() + 1)).slice(-2) +
      '/' +
      d.getFullYear();

    return creationDateAux;
  }
}
