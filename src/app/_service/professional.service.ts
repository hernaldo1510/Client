import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError as ObservableThrowError, Observable } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { isArray } from 'util';
import { unescapeHtml } from '@angular/platform-browser/src/browser/transfer_state';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalService {
  constructor(private http: HttpClient) {}

  public getById$(id: string) {
    return (
      this.http
        .get(`${environment.baseUrl}${environment.professional}/${id}`)
        .pipe(
          map((res: any) => {
            // if (!isArray(res.speciality)) {
            //   res.specialities = [{ name: res.speciality }];
            //   delete res.speciality;
            // }
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
