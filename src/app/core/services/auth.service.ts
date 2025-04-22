import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { CookieService } from '../services/cookie.service';
import { User } from '../models/auth.models';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

enum grant_type {
  PASSWORD = 'password',
  REFRESH_TOKEN = 'refresh_token'
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private readonly BASE_URL = environment.AUTH_END_URL;
  // private readonly BASE_URL = environment.END_URL;
  token: any = sessionStorage.getItem('currentUser');
  user: User;
  accessToken: any;

  // token event emitters
  refreshTokenSubject = new Subject();
  updateToken$ = new Subject();

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private toastr: ToastrService,
    private route: Router,
    private modal: NgbModal
  ) {}

  /**
   * Returns the current user
   */
  public currentUser(): User {
    // debugger;
    if (!this.user) {
      this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    }
    return this.user;
  }

  /**
   * Performs the auth
   * @param email email of user
   * @param password password of user
   */
  login(email: string, password: string): Observable<any> {
    {
      const params = new URLSearchParams();
      params.append('username', email);
      params.append('password', password);
      params.append('grant_type', 'password');
      // Set Headers
      const headers = {
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        Authorization:
          'Basic ' +
          btoa(environment.CLIENT_ID + ':' + environment.CLIENT_SECRET)
      };

      return this.http
        .post<any>(`${this.BASE_URL}/oauth/token`, params.toString(), {
          headers,
          observe: 'response'
        })
        .pipe(
          map(user => {
            // sessionStorage.setItem('currentUser', JSON.stringify(user.body));
            // sessionStorage.setItem('email', email);
            return user;
          })
        );
    }
  }
  getUserInfo(email) {
    const headers = this.fetchAccessToken();
    return this.http.get(
      `${this.BASE_URL}/api/user/private/get-user-information/${email}`,
      { headers }
    );
  }
  /**
   * Logout the user
   */
  logout() {
    sessionStorage.clear();
    this.user = null;
  }

  /**
   * Returns a email to a specified email id to change password
   */
  forgotPassword(email) {
    // let params = new URLSearchParams();
    // params.append(email);
    return this.http
      .post<any>(
        `${this.BASE_URL}/user/public/forgot-password?email=${email}`,
        ''
      )
      .pipe(
        map(user => {
          return user;
        })
      );
  }

  /**
   * Genrate new password
   */
  changePassword(payload) {
    return this.http
      .post<any>(`${this.BASE_URL}/user/public/reset-password`, payload)
      .pipe(
        map(user => {
          return user;
        })
      );
  }

  /**
   * Refresh token
   */
  refreshToken(refreshtoken: string): Observable<any> {
    const params = new URLSearchParams();
    params.append('refresh_token', refreshtoken);
    params.append('grant_type', 'refresh_token');
    // Set Headers
    const headers = {
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization:
        'Basic ' + btoa(environment.CLIENT_ID + ':' + environment.CLIENT_SECRET)
    };
    return this.http.post<any>(
      `${this.BASE_URL}/oauth/token`,
      params.toString(),
      { headers }
    );
  }

  /**
   * Validate whether token is expired
   */
  validateToken(token) {
    return this.http.get<any>(
      `${this.BASE_URL}/user/public/reset?token=${token}`
    );
  }

  /**
   * Revoke whether token is expired
   */
  revokeToken() {
    this.accessToken = sessionStorage.getItem('currentUser');
    const headers = {
      Authorization:
        'Basic ' +
        btoa(environment.CLIENT_ID + ':' + environment.CLIENT_SECRET),
      'AUTH-TOKEN': 'Bearer ' + JSON.parse(this.accessToken).access_token
    };
    return this.http.delete<any>(`${this.BASE_URL}/oauth/token`, { headers });
  }

  fetchAccessToken() {
    this.accessToken = sessionStorage.getItem('currentUser');
    const headers = {
      Authorization: 'Bearer ' + JSON.parse(this.accessToken).access_token
    };
    return headers;
  }

  // fetchHeaders() {
  //   this.accessToken = sessionStorage.getItem('currentUser');
  //   const headers = {
  //     Authorization: 'Bearer ' + JSON.parse(this.accessToken).access_token,
  //     'Content-Type': 'multipart/form-data'
  //   };
  //   return headers;
  // }
  recallApi(functionName) {
    console.log(functionName);
    let refreshToken = sessionStorage.getItem('currentUser');
    refreshToken = JSON.parse(refreshToken).refresh_token;
    this.refreshToken(refreshToken).subscribe(
      response => {
        console.log({
          console_message: 'Refresh Token Response ===> ',
          response
        });
        sessionStorage.currentUser = JSON.stringify(response);
        functionName();
      },
      errr => {
        console.log(errr);
        this.toastr.error('Session expired!');
        this.modal.dismissAll();
        sessionStorage.clear();
        this.route.navigate(['/account/login']);
      }
    );
  }
}
