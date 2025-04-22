import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from '../services/cookie.service';
import { AuthenticationService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly BASE_URL = environment.END_URL;
  // token: any = sessionStorage.getItem('currentUser');

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private authenticationService: AuthenticationService
  ) {}

  getDashboardDetails(id, role) {
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(
      `${this.BASE_URL}/user/private/dashboard/${role}/${id}`,
      {
        headers,
      }
    );
  }

  getFilteredDashboardDetails(data) {
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.post(
      `${this.BASE_URL}/user/private/dashboarddata`, data,
      {
        headers,
      }
    );
  }
}
