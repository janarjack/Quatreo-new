import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthenticationService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TlMainScreenService {

  private readonly BASE_URL = environment.END_URL;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  GetOrderForTL(id) {
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(`${this.BASE_URL}/order/private/orders/tl-order/${id}`, {
      headers
    });
  }

  ReassignOrdertoOtherUser(data) {
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.post(`${this.BASE_URL}/user/private/user/re-assign-order`, data, {
      headers
    });
  }

  // /user/private/users-by-client-product
  getUserById(data) {
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.post(`${this.BASE_URL}/user/private/users-by-client-product`, data , {
      headers
    });
  }

  filterTl(data) {
    const params = new HttpParams()
      .set('id', data.id)
      .set('clientId', data.clientId)
      .set('status', data.status)
      .set('fromDate', data.fromDate)
      .set('toDate', data.toDate)
      .set('downloadFlag', data.downloadFlag)
      .set('fileType', data.fileType);
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(
      `${this.BASE_URL}/order/private/order-tl-filter?` + params,
      { headers }
    );

  }
}
