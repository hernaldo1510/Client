import {
  Injectable
} from '@angular/core';
import {
  map,
  catchError
} from 'rxjs/operators';
import {
  Observable,
  throwError as ObservableThrowError
} from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import {
  environment
} from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) {}

  sendEmail(msg: any) {
    const data = {
      sender: 'soporterme@ucchristus.cl',
      recipient: 'afloresjim@ucchristus.cl',
      subject: 'test email',
      bodyText: 'Consulta Medica Virtual\r\n Se ha creado la consulta médica virtual con el Doctor(a) %s y podra acceder por medio de la siguiente url %s>link</a> a las %s del día %s.',
      bodyHtml: '<html><head></head><body><h1>Consulta Medica Virtual</h1><p>Se ha creado la consulta médica virtual con el Doctor(a) %s y podra acceder por medio del siguiente<a href=\'%s\'>link</a> a las %s del día %s.</p><p>Se le aconseja conectarse unos minutos antes para comenzar la consulta a la hora señalada</p> </body></html>'
    };
    return this.http
      .post(`${environment.baseUrl}${environment.sendEmail}`, data)
      .pipe(
        map((res: any) => {
          console.log(res);
          return res;
        })
      )
      .pipe(catchError(error => this._handleError(error)));
  }

  private _handleError(err: HttpErrorResponse | any): Observable < any > {
    const errorMsg = err.message || 'Error: No se pudo completar la petición';
    return ObservableThrowError(errorMsg);
  }
}
