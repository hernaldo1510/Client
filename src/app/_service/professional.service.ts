import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError as ObservableThrowError, Observable } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalService {
  constructor(private http: HttpClient) {}

  public getById$(id: string) {
    id = id.replace('-', '').replace(/\./g, '');
    return (
      this.http
        .get(`${environment.baseUrl}${environment.professional}/${id}`)
        .pipe(
          map((res: any) => {
            res._run = id;
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
