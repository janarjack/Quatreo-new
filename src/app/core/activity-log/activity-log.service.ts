import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthenticationService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityLogService {
  private readonly BASE_URL = environment.END_URL;
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}
  getActivityLogs(data) {
    const params = new HttpParams()
      .set('page', data.page)
      .set('size', data.size)
      .set('sort', data.sort)
      .set('order', data.order)
      .set('queryString', data.queryString)
      .set('userId', data.userId);
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(
      `${this.BASE_URL}/user/private/user-activity-log-filter?` + params,
      { headers }
    );
    // .pipe(this.http_retry());
  }
  searchlog(data) {
    console.log(data);

    const params = new HttpParams()
      .set('page', data.page)
      .set('size', data.size)
      .set('sort', data.sort)
      .set('order', data.order)
      .set('queryString', data.queryString)
      .set('userId', data.userId);
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(
      `${this.BASE_URL}/user/private/user-activity-log-filter?` + params,
      { headers }
    );
  }
  saveOrEditLog(data) {
    const headers = this.authenticationService.fetchAccessToken();
    // if (data.id) {
    // } else {
    return this.http.post(
      `${this.BASE_URL}/user/private/user-activity-log`,
      data,
      {
        headers
      }
    );
    // }llllll
  }
}
