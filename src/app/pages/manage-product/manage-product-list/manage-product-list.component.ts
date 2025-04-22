import { Component, OnInit } from '@angular/core';
import { ManageProductService } from 'src/app/core/manage-product/manage-product.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { GetStatusService } from '../../../core/common/helpers/getstatus.service';

@Component({
  selector: 'app-manage-product-list',
  templateUrl: './manage-product-list.component.html',
  styleUrls: ['./manage-product-list.component.scss']
})
export class ManageProductListComponent implements OnInit {
  loading = false;
  breadCrumbItems: Array<{}>;
  productList: any = [];
  constructor(
    private productService: ManageProductService,
    private commonService: GetStatusService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [
      { label: 'Quatreo', path: '/' },
      { label: 'Manage product', path: '/', active: true }
    ];
    this._fetchData();
  }

  // get product data
  _fetchData() {
    this.loading = true;
    this.productService.getAllProducts().subscribe(
      response => {
        console.log(response);
        this.loading = false;
        const res = 'data';
        if (response[res]) {
          this.productList = response[res];
        }
      },
      err => {
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(this._fetchData.bind(this));
        }
        this.loading = false;
      }
    );
  }
}
