import { Component, OnInit } from '@angular/core';
import { TLData } from './data';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QualityAuditService } from 'src/app/core/quality-audit/quality-audit.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-quality-audit-list',
  templateUrl: './quality-audit-list.component.html',
  styleUrls: ['./quality-audit-list.component.scss'],
})
export class QualityAuditListComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private qualityAuditservice: QualityAuditService,
    private authenticationService: AuthenticationService,
    private toaster: ToastrService,
    private datepipe: DatePipe
  ) {}

  get form() {
    return this.userForm.controls;
  }
  today = '';
  page = 1;
  pageSize = 5;
  submitted = false;
  breadCrumbItems: Array<{}>;
  tableData: any[] = [];
  selectClient: string[];
  prodArr = [];
  selectClientOrder: string[];
  selectQuatreoOrder: string[];
  userForm: FormGroup;
  selectType = ['New', 'Update'];
  prodctdata: Array<any> = [];
  selectSkill = [];
  loading = false;
  sizeOptions: Array<any> = [
    { name: '5', value: 5 },
    { name: '10', value: 10 },
    { name: '25', value: 25 },
  ];

  saveAction = [];
  ngOnInit() {
    this.breadCrumbItems = [
      {
        label: 'Quatreo',
        path: '/',
      },
      {
        label: 'Quality Audit',
        path: '/',
        active: true,
      },
    ];
    this.getAllClientList();
    this.getProducts();
    this.getordernumbers();
    this.getQuatreoOrderNumber();
    this.createForm();
  }

  // get all client list
  getAllClientList() {
    this.qualityAuditservice
      .getClientbyUserid(sessionStorage.getItem('uid'))
      .subscribe(
        (response) => {
          if (response) {
            const val = 'data';
            this.selectClient = response[val];
          }
        },
        (err) => {
          if (err.status === 401 && err.error.error === 'invalid_token') {
            this.authenticationService.recallApi(
              this.getAllClientList.bind(this)
            );
          }
        }
      );
  }

  // Get all product list
  getProducts() {
    this.qualityAuditservice.getAllProducts().subscribe(
      (res) => {
        const val = 'data';
        this.prodctdata = res[val];
        // if (this.action === 'Add') {
        this.prodctdata.map((ele) => {
          ele.status = false;
        });
      },
      (err) => {
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(this.getProducts.bind(this));
        }
      }
    );
  }

  // get Client Order Number By Userid
  getordernumbers() {
    this.qualityAuditservice
      .getClientOrderNumberByUserid(sessionStorage.getItem('uid'))
      .subscribe(
        (response) => {
          if (response) {
            const val = 'data';
            this.selectClientOrder = response[val].clientOrderNumber;
            console.log(this.selectClientOrder);
          }
        },
        (err) => {
          if (err.status === 401 && err.error.error === 'invalid_token') {
            this.authenticationService.recallApi(
              this.getAllClientList.bind(this)
            );
          }
        }
      );
  }

  // get Client Order Number By Userid
  getQuatreoOrderNumber() {
    this.qualityAuditservice
      .getQuatreoOrderNumberByUserid(sessionStorage.getItem('uid'))
      .subscribe(
        (response) => {
          if (response) {
            const val = 'data';
            this.selectQuatreoOrder = response[val].quatreoOrderNumber;
            console.log(this.selectQuatreoOrder);
          }
        },
        (err) => {
          if (err.status === 401 && err.error.error === 'invalid_token') {
            this.authenticationService.recallApi(
              this.getQuatreoOrderNumber.bind(this)
            );
          }
        }
      );
  }

  createForm() {
    this.userForm = this.fb.group({
      clientid: [''],
      type: [''],
      clientOrder: [''],
      quatreoOrder: [''],
      productType: [''],
      fromDate: [''],
      toDate: [''],
      auitnumber: ['', Validators.required],
    });

    this.userForm.get('toDate').valueChanges.subscribe((values) => {
      if (
        moment(values).valueOf() <=
        moment(this.userForm.controls.fromDate.value).valueOf()
      ) {
        this.toaster.error(
          'Expected date connot be smaller than or equal to the Received date'
        );
        return this.userForm.controls.toDate.setValue('', {
          emitEvent: false,
        });
      }
    });
    this.userForm.get('fromDate').valueChanges.subscribe((values) => {
      if (
        moment(values).valueOf() >=
        moment(this.userForm.controls.toDate.value).valueOf()
      ) {
        this.toaster.error(
          'To date connot be smaller than or equal to the From date'
        );

        return this.userForm.controls.toDate.setValue('', {
          emitEvent: false,
        });
      }
    });
  }

  // // edit or add client
  // auditClientdata(data) {
  //   console.log(data);
  //   const modalref = this.modalService.open(QualityAuditScreenComponent, {
  //     centered: true,
  //     size: 'lg',
  //     backdrop: 'static',
  //     keyboard: false
  //   });
  //   modalref.componentInstance.clientdata = data;

  //   modalref.componentInstance.passEntry.subscribe(receivedEntry => {
  //     console.log(receivedEntry);
  //   });
  // }

  onChangeProduct(e, i) {
    if (e.target.checked) {
      this.prodArr.push(this.prodctdata[i].id);
    } else {
      this.prodArr.splice(this.prodArr.indexOf(this.prodctdata[i]), 1);
    }
    this.prodctdata[i].status = e.target.checked ? true : false;
  }

  saveData() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    const qualityDate = this.userForm.value;
    const data = {
      userId: +sessionStorage.uid,
      clientId: qualityDate.clientid,
      type: qualityDate.type,
      productId: this.prodArr,
      clientOrderNumber: qualityDate.clientOrder,
      quatreoOrderNumber: qualityDate.quatreoOrder,
      fromDate: this.datepipe.transform(qualityDate.fromDate, 'yyyy-MM-dd'),
      toDate: this.datepipe.transform(qualityDate.toDate, 'yyyy-MM-dd'),
      auditPercentage: qualityDate.auitnumber,
    };
    this.loading = true;
    this.qualityAuditservice.savefilter(data).subscribe(
      (response) => {
        console.log(response);
        const val = 'data';
        this.tableData = response[val];
        this.loading = false;
      },
      (err) => {
        this.loading = false;
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(this.saveData.bind(this));
        }
        if (err.error.message) {
          this.toaster.error(err.error.message);
        }
      }
    );
    // this.passEntry.emit("ok");
  }
  onChangeOrder(e, i) {
    if (e.target.checked) {
      this.saveAction.push(+e.target.value);
    } else {
      this.saveAction.splice(this.saveAction.indexOf(e.target.value), 1);
    }
    console.log(this.saveAction);
  }

  moveToAudit() {
    if (this.saveAction.length) {
      const data = {
        userId: +sessionStorage.uid,
        orderId: this.saveAction,
      };
      this.qualityAuditservice.moveToAudit(data).subscribe(
        (res) => {
          console.log(res);
          this.toaster.success('Moved to Audit Successfully');
        },
        (err) => {
          if (err.status === 401 && err.error.error === 'invalid_token') {
            this.authenticationService.recallApi(this.moveToAudit.bind(this));
          }
          if (err.error.message) {
            this.toaster.error(err.error.message);
          }
        }
      );
    } else {
      this.toaster.error('Make sure you have checked alteast one');
    }
  }
}
