import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { observable, from, Observable, interval, throwError, of } from 'rxjs';
import { AuthenticationService } from '../services/auth.service';
import { retryWhen, flatMap, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PendingForAuditService {
  private readonly BASE_URL = environment.END_URL;
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  getOrderList(id) {
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(
      `${this.BASE_URL}/order/private/orders/old-audit/${id}`,
      {
        headers
      }
    );
  }
  getAllStatus() {
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(`${this.BASE_URL}/master/private/status`, {
      headers
    });
  }
  saveOrder(data, files) {
    const params = new FormData();
    params.append('data', JSON.stringify(data));
    for (const file1 of files) {
      if (file1) {
        params.append('orderAttachment', file1);
      }
    }

    const headers = this.authenticationService.fetchAccessToken();
    return this.http.post(
      `${this.BASE_URL}/order/private/order-attachment-details`,
      params,
      {
        headers
      }
    );
  }

  viewFile(id) {
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(
      `${this.BASE_URL}/client/private/view-guideline-file/${id}`,
      {
        headers
      }
    );
  }

  viewAttachment(id) {
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(
      `${this.BASE_URL}/order/private/view-order-attachment-file/${id}`,
      {
        headers
      }
    );
  }

  getClientbyUserid(id) {
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(`${this.BASE_URL}/client/private/client-user/${id}`, {
      headers
    });
  }

  saveAuditDetails(data) {

    const headers = this.authenticationService.fetchAccessToken();
    return this.http.post(`${this.BASE_URL}/order/private/order-audit-details`, data, {
      headers
    });
  }



}
