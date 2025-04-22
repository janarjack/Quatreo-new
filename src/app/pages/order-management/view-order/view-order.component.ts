import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss'],
})
export class ViewOrderComponent implements OnInit {
  @Input() orderDetails: any;
  viewDetails;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    console.log('orderDetails:', this.orderDetails);
    this.viewDetails = this.orderDetails;
  }
  convertDateToString(dateToBeConverted: string) {
    if (dateToBeConverted) {
      return new Date(dateToBeConverted.replace(/-/g, ' '));
    }
  }
}
