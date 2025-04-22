import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ManageProductService {
  private readonly BASE_URL = environment.END_URL;
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}
  getAllProducts() {
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(`${this.BASE_URL}/product/private/products`, {
      headers
    });
  }

  getAllSubProducts(id) {
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(
      `${this.BASE_URL}/product/private/sub-products/${id}`,
      { headers }
    );
  }

  getProductByClient(id) {
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(
      `${this.BASE_URL}/client/private/client-product/${id}`,
      { headers }
    );
  }
  getproductsubproducts(id) {
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(
      `${this.BASE_URL}/client/private/client-subProduct/${id}`,
      { headers }
    );
  }
}
