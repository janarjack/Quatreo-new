import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from '../services/cookie.service';
import { AuthenticationService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OvertimeScreenService {
  private readonly BASE_URL = environment.END_URL;
  // token: any = sessionStorage.getItem('currentUser');

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private authenticationService: AuthenticationService
  ) {}
  getAllOTLog(data) {
    // const params = new HttpParams()
    //   .set('page', data.page)
    //   .set('size', data.size)
    //   .set('sort', data.sort)
    //   .set('order', data.order);
    // const headers = this.authenticationService.fetchAccessToken();
    // return this.http.get(`${this.BASE_URL}/user/private/user`, {
    //   headers
    // });
  }

  saveOrEditOTLog(data) {
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.post(`${this.BASE_URL}/user/private/user-ot-log`, data, {
      headers
    });
  }

  viewOTLog(id) {
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(`${this.BASE_URL}/user/private/user/` + id, {
      headers
    });
  }

  getOTLogByUser(data) {
    const params = new HttpParams()
      .set('page', data.page)
      .set('size', data.size)
      .set('sort', data.sort)
      .set('order', data.order)
      .set('queryString', data.queryString);
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(
      `${this.BASE_URL}/user/private/user-ot-log-filter?` + params,
      {
        headers
      }
    );
  }

  searchOTLog(data) {
    console.log(data);

    const params = new HttpParams()
      .set('page', data.page)
      .set('size', data.size)
      .set('sort', data.sort)
      .set('order', data.order)
      // .set('queryString', data.queryString)
      .set('userId', data.userId);
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(
      `${this.BASE_URL}/user/private/user-activity-log-filter?` + params,
      { headers }
    );
  }

  // getAllUers() {
  //   const headers = this.authenticationService.fetchAccessToken();
  //   return this.http.get(`${this.BASE_URL}/user/private/user`, {
  //     headers
  //   });
  // }

  getUserById(id) {
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(`${this.BASE_URL}/user/private/user/client-users/${id}`, {
      headers
    });
  }
}
