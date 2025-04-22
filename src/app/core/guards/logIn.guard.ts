import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { AuthenticationService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class LogInGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) {
      // this.router.navigate(['/dashboard']);
      return true;
    }
    this.sweetalert();
    return false;
  }

  // Alert user about session expiration
  sweetalert() {
    Swal.fire({
      title: 'Are you sure you want to quit session?',
      // text: 'You won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No !',
      confirmButtonClass: 'btn btn-success mt-2',
      cancelButtonClass: 'btn btn-danger ml-2 mt-2',
      buttonsStyling: false
    }).then(result => {
      // this.passData(result);
      if (result.value) {
        this.authenticationService.logout();
        this.router.navigate(['/account/login']);
      }
    });
  }
}
