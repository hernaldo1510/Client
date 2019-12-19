import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import {
  Observable,
  throwError as ObservableThrowError
} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  sendEmail(msg: any) {
    const data = {

    };
    return this.http
      .post(`${environment.baseUrl}${environment.rme}`, data)
      .pipe(
        map((res: any) => {
          console.log(res);
          return res;
        })
      )
      .pipe(catchError(error => this._handleError(error)));
  }

  private _handleError(err: HttpErrorResponse | any): Observable<any> {
    const errorMsg = err.message || 'Error: No se pudo completar la petición';
    return ObservableThrowError(errorMsg);
  }
}
