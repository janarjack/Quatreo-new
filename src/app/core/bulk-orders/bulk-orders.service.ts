import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BulkOrdersService {
  private readonly BASE_URL = environment.END_URL;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  getAllBulkOrders() {
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(`${this.BASE_URL}/order/private/order-bulk-status`, {
      headers,
    });
    // .pipe(this.http_retry());
  }
  openErrorFile(id) {
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(`${this.BASE_URL}/order/private/bulk/error/${id}`, {
      headers,
    });
    // .pipe(this.http_retry());
  }
  downloadErrorFile(id) {
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(`${this.BASE_URL}/order/private/get-bulk-error-file/${id}`, {
      headers,
    });
    // .pipe(this.http_retry());
  }
}
