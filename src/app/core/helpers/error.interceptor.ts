import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private toaster: ToastrService,
    private route: Router
  ) {
    // this.applyCredentials()
  }
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  data = this.refreshTokenSubject.asObservable();

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // const currentUser = this.authenticationService.currentUser();
    return next.handle(request).pipe(
      catchError(err => {
        const error = err;
        return throwError(error);
      })
    );
  }
  applyCredentials(req, token) {
    // if (token !== 'undefined') {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    // retry(1);
    // }
    return req;
  }
}
