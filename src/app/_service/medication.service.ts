import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError as ObservableThrowError, Observable } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { isObject } from 'util';
import { isArray } from 'ngx-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  constructor(private http: HttpClient) {}

  public titleCaseWord(word: string) {
    if (!word) {
      return word;
    }
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

  public getHighFrequencyByProfessional$(id: string) {
    id = id.replace('-', '').replace(/\./g, '');
    return (
      this.http
        .get(
          `${environment.baseUrl}${environment.medication}/${
            environment.medicationHighFrequency
          }?professionalId=${id}`
        )
        .pipe(
          map((res: any) => {
            res.map((m: any) => {
              if (m.composition && m.composition.medicationForm) {
                if (
                  isObject(m.composition.medicationForm) &&
                  !isArray(m.composition.medicationForm)
                ) {
                  m.composition.medicationForm = [m.composition.medicationForm];
                }
                m.composition.medicationForm.map((mf: any) => {
                  mf.desc = this.titleCaseWord(mf.desc);
                });
              }
            });
            return res;
          })
        )
        // solo para pruebas
        // .pipe(delay(2000))
        .pipe(catchError(error => this._handleError(error)))
    );
  }

  public getByActiveIngredient$(name: string) {
    return (
      this.http
        .get(
          `${environment.baseUrl}${environment.medication}/${
            environment.medicationActiveIngredient
          }?active_ingredient=${name}`
        )
        .pipe(
          map((res: any) => {
            res.map((m: any) => {
              if (m.composition && m.composition.medicationForm) {
                // if (isObject(m.composition.medicationForm)) {
                //   m.composition.medicationForm = [m.composition.medicationForm];
                // }
                m.composition.medicationForm.map((mf: any) => {
                  mf.desc = this.titleCaseWord(mf.desc);
                });
              }
            });
            return res;
          })
        )
        // solo para pruebas
        // .pipe(delay(2000))
        .pipe(catchError(error => this._handleError(error)))
    );
  }

  public getByComercialName$(name: string) {
    return (
      this.http
        .get(
          `${environment.baseUrl}${environment.medication}/${
            environment.medicationComercialName
          }?comercialName=${name}`
        )
        .pipe(
          map((res: any) => {
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
