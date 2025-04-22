import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { observable, from, Observable, interval, throwError, of } from 'rxjs';
import { AuthenticationService } from '../services/auth.service';
import { retryWhen, flatMap, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManageClientService {
  private readonly BASE_URL = environment.END_URL;
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  getAllClients(data) {
    const params = new HttpParams()

      .set('page', data.page)
      .set('size', data.size)
      .set('sort', data.sort)
      .set('order', data.order);
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(
      `${this.BASE_URL}/client/private/client-filter?` + params,
      { headers }
    );
    // .pipe(this.http_retry());
  }
  getAllClientsList() {
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(`${this.BASE_URL}/client/private/clients`, {
      headers
    });
    // .pipe(this.http_retry());
  }

  // http_retry(maxRetry: number = 2, delayMs: number = 2000) {
  //   debugger;
  //   return (src: Observable<any>) => src.pipe(
  //     retryWhen(_ => {
  //       return interval(delayMs).pipe(
  //         flatMap(count => count == maxRetry ? throwError("Giving up") : of(count))
  //       )
  //     })
  //   )
  // }

  saveOrEditClient(data) {
    const headers = this.authenticationService.fetchAccessToken();
    // if (data.id) {
    // } else {
    return this.http.post(`${this.BASE_URL}/client/private/client`, data, {
      headers
    });
    // }llllll
  }

  viewClient(id) {
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(`${this.BASE_URL}/client/private/client/${id}`, {
      headers
    });
  }

  searchClient(data) {
    console.log(data);

    const params = new HttpParams()
      .set('page', data.page)
      .set('size', data.size)
      .set('sort', data.sort)
      .set('order', data.order)
      .set('queryString', data.queryString);
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(
      `${this.BASE_URL}/client/private/client-filter?` + params,
      { headers }
    );
  }

  getAllClientList() {
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(`${this.BASE_URL}/client/private/clients`, {
      headers
    });
  }

  downloadFiles(id) {
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(`${this.BASE_URL}/client/private/view-file/${id}`, {
      headers
    });
  }
  deleteEmployee(data) {
    console.log(data, 'empppp');
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.post(
      `${this.BASE_URL}/client/private/delete-client-employee`,
      data,
      { headers }
    );
  }
  deleteFile(data) {
    console.log(data, 'empppp');
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.post(`${this.BASE_URL}/client/private/delete-file`, data, {
      headers
    });
  }
}
