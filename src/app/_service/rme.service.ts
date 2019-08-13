import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  throwError as ObservableThrowError
} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormArray, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Medication } from '@app/_model/medication';
import { environment } from 'environments/environment';
import { map, catchError } from 'rxjs/operators';
import { isObject } from 'rxjs/internal/util/isObject';
import { isUndefined } from 'util';
import { RmeForm } from '@app/_model/rme-form';
import { Rme } from '@app/_model/rme';
import { IndicationForm } from '@app/_model/indication-form';
import { Indication } from '@app/_model/indication';

@Injectable({
  providedIn: 'root'
})
export class RmeService {
  durationType = environment.durationType;
  frecuencyUnit = environment.frecuencyUnit;
  posologyType = environment.posologyType;
  appointmentId = false;

  private medList$: BehaviorSubject<Array<Medication>> = new BehaviorSubject(
    []
  );
  public readonly medList: Observable<
    Array<Medication>
  > = this.medList$.asObservable();

  private rmeForm$: BehaviorSubject<
    FormGroup | undefined
  > = new BehaviorSubject(this.fb.group(new RmeForm(new Rme())));
  public readonly rmeForm: Observable<FormGroup> = this.rmeForm$.asObservable();

  private professional$: BehaviorSubject<any> = new BehaviorSubject(false);
  public readonly professional: Observable<
    any
  > = this.professional$.asObservable();

  private patient$: BehaviorSubject<any> = new BehaviorSubject(false);
  public readonly patient: Observable<any> = this.patient$.asObservable();

  private medicationHighFrequency$: BehaviorSubject<any> = new BehaviorSubject(
    false
  );
  public readonly medicationHighFrequency: Observable<
    any
  > = this.medicationHighFrequency$.asObservable();

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  hasMedications() {
    return this.medList$.value.length > 0;
  }

  addFrecuent(medAux: any) {
    console.log(medAux);
    const cpMed = { ...medAux };
    delete cpMed.checked;
    const d = new Date();

    const afArr: any = [];

    for (const mf of cpMed.medication.composition.medicationForm) {
      for (const af of mf.administerForm) {
        const afAux = {
          desc: af,
          medicationForm: { ...mf }
        };
        delete afAux.medicationForm.administerForm;
        afArr.push(afAux);
      }
    }

    cpMed.medication.composition.administerForm = afArr;

    let formSel: any;
    if (cpMed.medication.composition.medicationFormSelected !== undefined) {
      formSel = cpMed.medication.composition.administerForm.find(
        (e: any) =>
          e.desc === cpMed.medication.composition.medicationFormSelected.desc &&
          e.medicationForm.id ===
            cpMed.medication.composition.medicationFormSelected.medicationForm
              .id
      );
    } else {
      formSel = cpMed.medication.composition.administerForm[0];
    }

    const med: Medication = {
      medication: cpMed.medication,
      duration: {
        unit: cpMed.frecuencyType,
        value: cpMed.duration ? cpMed.duration : ''
      },
      // duration: { unit: this.durationType[0].code, value: '' },
      frecuency: {
        unit: this.frecuencyUnit[0],
        value: cpMed.frecuency ? cpMed.frecuency : ''
      },
      posology: {
        unit: formSel,
        value: cpMed.units ? cpMed.units : ''
      },
      observations: '',
      commercialRecommendation: cpMed.commercialRecomendation
        ? cpMed.commercialRecomendation
        : false,
      indicationStartDate: d
    };
    const currentValue = this.medList$.value;
    const updatedValue = [...currentValue, med];
    this.medList$.next(updatedValue);
  }

  addMedication(medAux: any) {
    delete medAux.checked;
    const afArr: any = [];

    for (const mf of medAux.composition.medicationForm) {
      for (const af of mf.administerForm) {
        const afAux = {
          desc: af,
          medicationForm: { ...mf }
        };
        delete afAux.medicationForm.administerForm;
        afArr.push(afAux);
      }
    }
    medAux.composition.administerForm = afArr;

    let formSel: any;
    formSel = medAux.composition.administerForm[0];

    const d = new Date();

    const med: Medication = {
      medication: medAux,
      duration: { unit: this.durationType[0].code, value: '' },
      frecuency: { unit: this.frecuencyUnit[0], value: '' },
      posology: {
        unit: formSel,
        value: ''
      },
      observations: '',
      commercialRecommendation: false,
      indicationStartDate: d
    };

    console.log(med);

    const ind = new Indication({
      medication: medAux,
      duration: { unit: this.durationType[0].code, value: '' },
      frecuency: { unit: this.frecuencyUnit[0], value: '' },
      posology: {
        unit: formSel,
        value: ''
      },
      observations: '',
      commercialRecommendation: false,
      indicationStartDate: d
    });

    const currentValue = this.medList$.value;
    const updatedValue = [...currentValue, med];
    this.medList$.next(updatedValue);

    const currentRme = this.rmeForm$.getValue();
    const currentIndications = currentRme.get('indications') as FormArray;
    currentIndications.push(
      this.fb.group(new IndicationForm(ind))
    );
  }

  delMedication(i: number) {
    const currentValue = this.medList$.value;
    const deleted = currentValue.splice(i, 1);
    this.medList$.next(currentValue);
  }

  setComercialRecommendation(i: number, r: any) {
    this.medList$.getValue()[i].commercialRecommendation = r;
  }

  setMedicationHighFrequency(data: any) {
    this.medicationHighFrequency$.next(data);
  }

  setProfessional(data: any) {
    this.professional$.next(data);
  }

  setPatient(data: any) {
    this.patient$.next(data);
  }

  setAppointment(appoId: any) {
    this.appointmentId = appoId;
  }

  saveNew(pw = false) {
    // const d = new Date();
    // const creationDateAux =
    //   ('0' + d.getDate()).slice(-2) +
    //   '/' +
    //   ('0' + (d.getMonth() + 1)).slice(-2) +
    //   '/' +
    //   d.getFullYear();

    // const data = {
    //   id: '' + Date.now(),
    //   preview: pw,
    //   appointmentId: this.appointmentId,
    //   creation_day: creationDateAux,
    //   patient: this.patient$.getValue(),
    //   professional: { ...this.professional$.getValue() },
    //   indications: []
    // };

    const data = new Rme(...this.professional$.getValue(), ...this.patient$.getValue());

    data.professional.specialities = [data.professional.specialitiesSel];
    delete data.professional.specialitiesSel;
    delete data.professional._run;

    if (!this.appointmentId) {
      delete data.appointmentId;
    }

    console.log('data', data);

    console.log('indications', this.rmeForm$.getValue().controls.indications.value);

    this.rmeForm$.getValue().controls.indications.value.forEach((m: any) => {
      console.log('ind', m);
      m.medication.composition.medicationFormSelected = m.posology.unit;
      const dStartAux =
        ('0' + m.indicationStartDate.getDate()).slice(-2) +
        '/' +
        ('0' + (m.indicationStartDate.getMonth() + 1)).slice(-2) +
        '/' +
        m.indicationStartDate.getFullYear();
      const med = {
        medication: m.medication,
        units: m.posology.value,
        unitType: m.posology.unit.desc,
        frecuencyType: m.duration.unit,
        frecuency: m.frecuency.value,
        frecuencyUnit: 'Horas',
        duration: m.duration.value,
        durationUnit: 'Días',
        observation: m.observations,
        commercialRecommendation:
          m.commercialRecommendation === false
            ? null
            : m.commercialRecommendation,
        indicationStartDate: dStartAux
      };
      data.indications.push(med);
    });
    return (
      this.http
        // .post(
        //   `${environment.baseUrl}/${environment.basePath}/${environment.rme}`,
        //   data
        // )
        .post(`${environment.baseUrl}${environment.rme}`, data)
        .pipe(
          map((res: any) => {
            return res;
          })
        )
        .pipe(catchError(error => this._handleError(error)))
    );
  }

  save(pw = false) {
    const d = new Date();
    const creationDateAux =
      ('0' + d.getDate()).slice(-2) +
      '/' +
      ('0' + (d.getMonth() + 1)).slice(-2) +
      '/' +
      d.getFullYear();

    const data = {
      id: '' + Date.now(),
      preview: pw,
      appointmentId: this.appointmentId,
      creation_day: creationDateAux,
      patient: this.patient$.getValue(),
      professional: { ...this.professional$.getValue() },
      indications: []
    };

    data.professional.specialities = [data.professional.specialitiesSel];
    delete data.professional.specialitiesSel;
    delete data.professional._run;

    if (!this.appointmentId) {
      delete data.appointmentId;
    }

    this.medList$.getValue().forEach(m => {
      m.medication.composition.medicationFormSelected = m.posology.unit;
      const dStartAux =
        ('0' + m.indicationStartDate.getDate()).slice(-2) +
        '/' +
        ('0' + (m.indicationStartDate.getMonth() + 1)).slice(-2) +
        '/' +
        m.indicationStartDate.getFullYear();
      const med = {
        medication: m.medication,
        units: m.posology.value,
        unitType: m.posology.unit.desc,
        frecuencyType: m.duration.unit,
        frecuency: m.frecuency.value,
        frecuencyUnit: 'Horas',
        duration: m.duration.value,
        durationUnit: 'Días',
        observation: m.observations,
        commercialRecommendation:
          m.commercialRecommendation === false
            ? null
            : m.commercialRecommendation,
        indicationStartDate: dStartAux
      };
      data.indications.push(med);
    });

    // console.log(JSON.stringify(data));
    return (
      this.http
        // .post(
        //   `${environment.baseUrl}/${environment.basePath}/${environment.rme}`,
        //   data
        // )
        .post(`${environment.baseUrl}${environment.rme}`, data)
        .pipe(
          map((res: any) => {
            return res;
          })
        )
        .pipe(catchError(error => this._handleError(error)))
    );
  }

  private _handleError(err: HttpErrorResponse | any): Observable<any> {
    const errorMsg = err.message || 'Error: No se pudo completar la petición';
    return ObservableThrowError(errorMsg);
  }
}
