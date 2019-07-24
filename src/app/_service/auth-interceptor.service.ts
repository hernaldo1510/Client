import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private router: Router, private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log('interceptor', this.auth.getToken());
    if (this.auth.getToken() !== null && this.auth.getToken() !== false) {
      const clonedReq = req.clone({
        headers: req.headers.set(
          'Authorization',
          'Bearer ' + this.auth.getToken()
        )
      });
      return next.handle(clonedReq).pipe(
        tap(
          succ => {},
          err => {
            // console.log(err);
            this.auth.removeToken();
            if (err.status === 401) {
              this.router.navigateByUrl('/forbidden');
            } else if (err.status === 403) {
              this.router.navigateByUrl('/forbidden');
            } else {
              // this.router.navigateByUrl('/forbidden');
            }
          }
        )
      );
    } else {
      // console.log('no token');
      this.router.navigateByUrl('/forbidden');
      // return next.handle(req.clone());
    }
  }
}
