import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  throwError as ObservableThrowError
} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Medication } from '@app/_model/medication';
import { environment } from 'environments/environment';
import { map, catchError } from 'rxjs/operators';
import { isObject } from 'rxjs/internal/util/isObject';
import { isUndefined } from 'util';

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

  private professional$: BehaviorSubject<any> = new BehaviorSubject(false);
  public readonly professional: Observable<
    Array<Medication>
  > = this.professional$.asObservable();

  private patient$: BehaviorSubject<any> = new BehaviorSubject(false);
  public readonly patient: Observable<any> = this.patient$.asObservable();

  private medicationHighFrequency$: BehaviorSubject<any> = new BehaviorSubject(
    false
  );
  public readonly medicationHighFrequency: Observable<
    any
  > = this.medicationHighFrequency$.asObservable();

  constructor(private http: HttpClient) {}

  hasMedications() {
    return this.medList$.value.length > 0;
  }

  addMedication(medAux: any) {
    // const medNew = {
    //   name: medAux.name,
    //   snomedId: medAux.snomedId
    // };

    // console.log(medAux, medAux.composition.medicationForm, medAux.composition.medicationFormSelected);
    let formSel: any;
    if (medAux.composition.medicationFormSelected !== undefined) {
      formSel = medAux.composition.medicationForm.find(e => e.id === medAux.composition.medicationFormSelected.id);
    } else {
      formSel = medAux.composition.medicationForm[0];
    }
    // console.log(medAux.composition.medicationForm.find(e => e.id === medAux.composition.medicationFormSelected.id));
    const med: Medication = {
      medication: medAux,
      duration: { unit: this.durationType[0].code, value: '' },
      frecuency: { unit: this.frecuencyUnit[0], value: '' },
      posology: {
        unit: formSel,
        value: ''
      },
      observations: ''
    };

    console.log(med);

    const currentValue = this.medList$.value;
    const updatedValue = [...currentValue, med];
    this.medList$.next(updatedValue);
  }

  delMedication(i: number) {
    const currentValue = this.medList$.value;
    const deleted = currentValue.splice(i, 1);
    this.medList$.next(currentValue);
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

  save(pw = false) {
    const d = new Date();
    const creationDateAux =
      ('0' + d.getDate()).slice(-2) +
      '/' +
      ('0' + (d.getMonth() + 1)).slice(-2) +
      '/' +
      d.getFullYear();

    const data = {
      id: +d,
      preview: pw,
      appointmentId: this.appointmentId,
      creation_day: creationDateAux,
      patient: this.patient$.getValue(),
      professional: this.professional$.getValue(),
      indications: []
    };

    if (!this.appointmentId) {
      delete data.appointmentId;
    }

    this.medList$.getValue().forEach(m => {
      m.medication.composition.medicationFormSelected = m.posology.unit;
      const med = {
        medication: m.medication,
        units: m.posology.value,
        unitType: m.posology.unit.desc,
        frecuencyType: m.duration.unit,
        frecuency: m.frecuency.value,
        frecuencyUnit: 'Horas',
        duration: m.duration.value,
        durationUnit: 'Días',
        observation: m.observations
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
        .post(
          `https://3mcqzhr3x4.execute-api.us-east-1.amazonaws.com/rme-dev/${
            environment.rme
          }`,
          data
        )
        .pipe(
          map((res: any) => {
            // console.log(res);
            return res;
          })
        )
        // solo para pruebas
        // .pipe(delay(2000))
        .pipe(catchError(error => this._handleError(error)))
    );
  }

  private _handleError(err: HttpErrorResponse | any): Observable<any> {
    const errorMsg = err.message || 'Error: No se pudo completar la petición';
    return ObservableThrowError(errorMsg);
  }
}
