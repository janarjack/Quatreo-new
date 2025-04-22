import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthenticationService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ManageOrderService {
  private readonly BASE_URL = environment.END_URL;
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  getAllOrders(data) {
    const params = new HttpParams()
      .set('page', data.page)
      .set('size', data.size)
      .set('sort', data.sort)
      .set('order', data.order);
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(
      `${this.BASE_URL}/order/private/order-filter?` + params,
      { headers }
    );
  }
  searchOrders(data) {
    console.log(data);

    const params = new HttpParams()
      .set('page', data.page)
      .set('size', data.size)
      .set('sort', data.sort)
      .set('order', data.order)
      .set('queryString', data.queryString);
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(
      `${this.BASE_URL}/order/private/order-filter?` + params,
      { headers }
    );
  }
  getAllStates() {
    // /master/private/state/
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(`${this.BASE_URL}/master/private/state`, { headers });
  }
  getAllCounty(id) {
    // /master/private/county/
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(`${this.BASE_URL}/master/private/county/${id}`, {
      headers,
    });
  }
  getPriorityList() {
    // /master/private/priority/
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(`${this.BASE_URL}/master/private/priority`, {
      headers,
    });
  }

  saveOrEditOrder(data) {
    const headers = this.authenticationService.fetchAccessToken();
    // if (data.id) {
    // } else {
    return this.http.post(`${this.BASE_URL}/order/private/order`, data, {
      headers,
    });
  }
  saveOrEditBulkOrder(data) {
    const headers = this.authenticationService.fetchAccessToken();
    // if (data.id) {
    // } else {
    return this.http.post(`${this.BASE_URL}/order/private/bulk-order`, data, {
      headers
    });
  }

  viewOrder(id) {
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(`${this.BASE_URL}/order/private/order/${id}`, {
      headers,
    });
  }

  getProductbyClient(id) {
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(
      `${this.BASE_URL}/client/private/client-product/${id}`,
      {
        headers,
      }
    );
  }

  getClientByEmpId(id) {
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(
      `${this.BASE_URL}/client/private/clients-by-client-employee/${id}`,
      {
        headers,
      }
    );
  }
}
