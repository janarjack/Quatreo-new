import { Injectable, Inject } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class GetStatusService {

  // get status active or inactive based on true or false value
  getStatus(state) {
    switch (state) {
      case true:
        return 'Active';
      case false:
        return 'In-Active';
    }
    return '';
  }

// apply css class based on the status of client
  getStatusClass(activeStatus) {
    switch (activeStatus) {
      case true:
        return 'success';
      case false:
        return 'danger';
    }
    return '';
  }
}
