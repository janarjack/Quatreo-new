import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class WeblinksService {
  private readonly BASE_URL = environment.END_URL;
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  getAllStates() {
    // /master/private/state/
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(`${this.BASE_URL}/master/private/state`, { headers });
  }
  getAllCounty(id) {
    // /master/private/county-details/
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(`${this.BASE_URL}/master/private/county-details/${id}`, {
      headers
    });
  }

  saveOrEditWeblinks(data) {
    const headers = this.authenticationService.fetchAccessToken();
    // if (data.id) {
    // } else {
    return this.http.post(`${this.BASE_URL}/master/private/county-web-link`, data, {
      headers
    });
  }

  getCountyWebLink(id) {
    // /master/private/county-web-link

    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(`${this.BASE_URL}/master/private/county-web-link/${id}`, {
      headers
    });
  }

}
