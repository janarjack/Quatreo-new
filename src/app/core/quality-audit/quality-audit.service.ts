import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class QualityAuditService {

  private readonly BASE_URL = environment.END_URL;
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  getClientbyUserid(id) {
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(`${this.BASE_URL}/client/private/client-user/${id}`, {
      headers
    });
  }

  getAllProducts() {
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(`${this.BASE_URL}/product/private/products`, {
      headers
    });
  }

  getClientOrderNumberByUserid(id) {
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(`${this.BASE_URL}/order/private/orders/order-number/${id}`, {
      headers
    });
  }


  getQuatreoOrderNumberByUserid(id) {
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(`${this.BASE_URL}/order/private/orders/quatreo-number/${id}`, {
      headers
    });
  }

  savefilter(data) {
    const params = new HttpParams()
      .set('userId', data.userId)
      .set('clientId', data.clientId)
      .set('type', data.type)
      .set('productId', data.productId)
      .set('clientOrderNumber', data.clientOrderNumber)
      .set('quatreoOrderNumber', data.quatreoOrderNumber)
      .set('fromDate', data.fromDate)
      .set('toDate', data.toDate)
      .set('auditPercentage', data.auditPercentage);
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(`${this.BASE_URL}/order/private/orders/audit?` + params, {
      headers
    });
  }


  moveToAudit(data) {
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.post(`${this.BASE_URL}/order/private/order/audit`, data, {
      headers
    });
  }

}
