import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError as ObservableThrowError, Observable } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(private http: HttpClient) {}

  public getById$(id: string) {
    return (
      this.http
        .get(
          `${environment.baseUrl}/${
            environment.patient
          }/${id}`
        )
        // .pipe(
        //   map((res: any) => {
        //     return res.body;
        //   })
        // )
        // solo para pruebas
        // .pipe(delay(2000))
        .pipe(catchError(error => this._handleError(error)))
    );
  }

  private _handleError(err: HttpErrorResponse | any): Observable<any> {
    const errorMsg = err.message || 'Error: No se pudo completar la petición';
    console.log(errorMsg);
    return ObservableThrowError(errorMsg);
  }
}
