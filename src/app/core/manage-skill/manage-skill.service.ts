import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CookieService } from '../services/cookie.service';
import { AuthenticationService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ManageSkillService {

  private readonly BASE_URL = environment.END_URL;

  constructor(private http: HttpClient, private cookie: CookieService, private authenticationService: AuthenticationService) { }
  getAllSkillSet() {
    const headers = this.authenticationService.fetchAccessToken();
    return this.http.get(`${this.BASE_URL}/skill/private/skills`, {headers});
  }
}
