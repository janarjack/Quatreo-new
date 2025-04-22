import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from '../services/cookie.service';
import { AuthenticationService } from '../services/auth.service';
// const headers = {
//   Authorization:
//     'Bearer ' + JSON.parse(sessionStorage.getItem('currentUser')).access_token
// };
@Injectable({
  providedIn: 'root'
})
export class ManageUserService {
  private readonly BASE_URL = environment.END_URL;
  // token: any = sessionStorage.getItem('currentUser');

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private authenticationService: AuthenticationService
  ) {}
  getAllUsers(data) {
    const params = new HttpParams()
      .set('page', data.page)
      .set('size', data.size)
      .set('sort', data.sort)
      .set('order', data.order);
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(
      `${this.BASE_URL}/user/private/user-filter?` + params,
      {
        headers
      }
    );
  }

  saveOrEditUser(data) {
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.post(`${this.BASE_URL}/user/private/user`, data, {
      headers
    });
  }

  viewUser(id) {
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(`${this.BASE_URL}/user/private/user/` + id, {
      headers
    });
  }

  searchUser(data) {
    console.log(data);

    const params = new HttpParams()
      .set('page', data.page)
      .set('size', data.size)
      .set('sort', data.sort)
      .set('order', data.order)
      .set('queryString', data.queryString);
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(
      `${this.BASE_URL}/user/private/user-filter?` + params,
      { headers }
    );
  }

  // change password
  changePassword(data) {
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.post(`${this.BASE_URL}/user/private/change-password`, data, {
      headers
    });
  }
}
