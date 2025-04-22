import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  Input,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import {
  NgbActiveModal,
  NgbModal,
  ModalDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import * as XLSX from 'xlsx';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ManageProductService } from 'src/app/core/manage-product/manage-product.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { ManageClientService } from 'src/app/core/manage-client/manage-client.service';
import { ManageOrderService } from 'src/app/core/manage-order/manage-order.service';
import { DatePipe } from '@angular/common';
import * as Handsontable from 'handsontable';
import * as moment from 'moment';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
  providers: [DatePipe],
})
export class AddOrderComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
    public fb: FormBuilder,
    private modalService: NgbModal,
    private toaster: ToastrService,
    private productService: ManageProductService,
    private authenticationService: AuthenticationService,
    private clientService: ManageClientService,
    private orderService: ManageOrderService,
    private datepipe: DatePipe,
    private toastr: ToastrService
  ) {}
  // get validations for form array
  get candidates(): FormArray {
    return this.singleForm.get('candidates') as FormArray;
  }

  // get validations for single order form
  get form() {
    return this.singleForm.controls;
  }
  tdydate = new Date();

  // get validations for bulk order form
  get bulkform() {
    return this.bulkForm.controls;
  }
  bulkForm: FormGroup;
  singleForm: FormGroup;
  employeeForm: FormArray;
  submitted = false;
  Bulksubmitted = false;
  bulkfile: any;
  prodctdata: Array<any> = [];
  prodArr = [];
  isedit = false;
  loading = false;
  today: Date = new Date();
  @Input() action: string;
  @Input() orderdata: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  isClient = false;
  selectClient = [];

  // @ViewChild('content')
  @ViewChild('content', { static: false }) content;
  private modalRef;
  closeResult: string;
  selectPriority: [];
  dataset = [];
  defaultDateset = [];
  contactsFileName = '';
  header = [
    'Client Name Type',
    'End Customer Order Number',
    'Client order number',
    'Received Date',
    'Seller Name',
    'buyer names',
    'Product Category',
    'Type',
    'Address',
    'County',
    'State',
    'Zip code',
    'APN',
    'Priority',
    'Legal Description',
    'Expected Delivery date',
    'Comments',
  ];
  handsontable: any;
  column = [
    { data: 'Client Name Type', type: 'text' },
    { data: 'End Customer Order Number', type: 'text' },
    { data: 'Client order number', type: 'text' },
    {
      data: 'Received Date',
      type: 'date',
      dateFormat: 'MM/DD/YYYY',
      correctFormat: true,
      defaultDate: '01/01/1900',
    },
    { data: 'Seller Name', type: 'text' },
    { data: 'buyer names', type: 'text' },
    { data: 'Product Category', type: 'text' },
    { data: 'Type', type: 'text' },
    { data: 'Address', type: 'text' },
    { data: 'County', type: 'text' },
    { data: 'State', type: 'text' },
    { data: 'Zip code', type: 'text' },
    { data: 'APN', type: 'text' },
    { data: 'Priority', type: 'text' },
    { data: 'Legal Description', type: 'text' },
    {
      data: 'Expected Delivery date',
      type: 'date',
      dateFormat: 'MM/DD/YYYY',
      correctFormat: true,
      defaultDate: '01/01/1900',
    },
    { data: 'Comments', type: 'text' },
  ];
  typedata = [
    {
      typeData: 'New',
    },
    {
      typeData: 'Updates',
    },
  ];
  sellerBuyerType = [
    {
      name: 'Seller',
    },
    {
      name: 'Buyer',
    },
  ];
  subroducts = [];
  modalReference: any;
  tempfilename: any;
  clientId: any;
  county = [];

  state = [];
  ngOnInit() {
    this.isClient = sessionStorage.role === 'Client' ? true : false;
    if (this.isClient && this.action === 'Add') {
      this.getEmpClient();
    } else {
      this.getAllClientList();
    }
    this.isedit = this.action === 'Edit' ? true : false;
    this.getPriorityList();
    this.createBulkForm();
    this.getProducts();
    this.getAllStates();
  }

  // initialize single order and bulk order form
  createBulkForm() {
    this.singleForm = this.fb.group({
      id: [this.action === 'Add' ? null : this.orderdata.order.id],
      clientName: [
        this.action === 'Add' ? '' : this.orderdata.order.client.id,
        Validators.required,
      ],
      fromDate: [
        this.action === 'Add'
          ? ''
          : this.convertDateToString(this.orderdata.order.recievedDate),
        Validators.required,
      ],
      customerOrder: [
        this.action === 'Add' ? '' : this.orderdata.order.endCustomerOrder,
        Validators.required,
      ],
      clientOrderNo: [
        this.action === 'Add' ? '' : this.orderdata.order.clientOrderNumber,
        Validators.required,
      ],
      apn: [this.action === 'Add' ? '' : this.orderdata.order.apn],
      state: [
        this.action === 'Add' ? null : this.orderdata.order.county.state,
        Validators.required,
      ],
      type: [
        this.action === 'Add' ? 'New' : this.orderdata.order.orderType,
        Validators.required,
      ],
      county: [
        this.action === 'Add' ? null : this.orderdata.order.county.countyName,
        Validators.required,
      ],
      city: [
        this.action === 'Add' ? '' : this.orderdata.order.city,
        Validators.required,
      ],
      zip: [
        this.action === 'Add' ? '' : this.orderdata.order.zipCode,
        [Validators.required, Validators.pattern('[0-9]+')],
      ],
      legalDesrc: [this.action === 'Add' ? '' : this.orderdata.order.legalDesc],
      address: [
        this.action === 'Add' ? '' : this.orderdata.order.rawAddress,
        Validators.required,
      ],
      comment: [this.action === 'Add' ? '' : this.orderdata.order.comments],
      expectedDate: [
        this.action === 'Add'
          ? ''
          : this.convertDateToString(this.orderdata.order.expectedDeliveryDate),
        Validators.required,
      ],
      noOfDays: [this.action === 'Add' ? '' : ''],
      priorityName: [
        this.action === 'Add' ? null : this.orderdata.order.priority,
        Validators.required,
      ],
      candidates: this.fb.array(
        this.action === 'Add'
          ? []
          : this.orderdata.orderSellerMapArray.length > 0
          ? this.orderdata.orderSellerMapArray.map((item) => {
              // console.log(item, 'item');
              const group = this.createEmployee();
              group.patchValue(item);
              return group;
            })
          : []
      ),
    });
    console.log(this.singleForm.value);

    this.employeeForm = this.singleForm.get('candidates') as FormArray;

    this.singleForm.get('expectedDate').valueChanges.subscribe((values) => {
      if (
        moment(values).valueOf() <=
        moment(this.singleForm.controls.fromDate.value).valueOf()
      ) {
        this.toaster.error(
          'Expected date connot be smaller than or equal to the Received date'
        );
        this.singleForm.controls.noOfDays.setValue('');

        return this.singleForm.controls.expectedDate.setValue('', {
          emitEvent: false,
        });
      }
    });
    this.singleForm.get('fromDate').valueChanges.subscribe((values) => {
      if (
        moment(values).valueOf() >=
        moment(this.singleForm.controls.expectedDate.value).valueOf()
      ) {
        this.toaster.error(
          'Expected date connot be smaller than or equal to the Received date'
        );
        this.singleForm.controls.noOfDays.setValue('');

        return this.singleForm.controls.expectedDate.setValue('', {
          emitEvent: false,
        });
      }
    });
    this.ondatechange();
    if (this.isedit) {
      this.selectedItem(this.orderdata.order.county.state);
      this.onChangeClient(this.orderdata.order.client.id);
    }
    this.bulkForm = this.fb.group({
      // id: [],
      clientName: ['', Validators.required],
      // contacts: ['', Validators.required],
      // productType: ['1', Validators.required]
    });
  }

  convertDateToString(dateToBeConverted: string) {
    if (dateToBeConverted) {
      return new Date(dateToBeConverted.replace(/-/g, ' '));
    }
  }
  // get all client list
  getAllClientList() {
    this.clientService.getAllClientsList().subscribe(
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
  getEmpClient() {
    this.orderService.getClientByEmpId(sessionStorage.uid).subscribe(
      (res) => {
        const val = 'data';
        this.selectClient = res[val];
      },
      (err) => {
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(this.getEmpClient.bind(this));
        }
      }
    );
  }
  // Get all priority list
  getPriorityList() {
    this.orderService.getPriorityList().subscribe(
      (res) => {
        const val = 'data';

        if (res[val]) {
          this.selectPriority = res[val];
        }
      },
      (err) => {
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(this.getPriorityList.bind(this));
        }
      }
    );
  }
  // Get all states
  getAllStates() {
    this.orderService.getAllStates().subscribe(
      (res) => {
        const val = 'data';
        if (res[val]) {
          this.state = res[val];
        }
      },
      (err) => {
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(this.getAllStates.bind(this));
        }
      }
    );
  }

  // Get all county based on state
  getCounty(id) {
    this.orderService.getAllCounty(id).subscribe(
      (res) => {
        const val = 'data';
        if (res[val].county) {
          this.county = res[val].county;
        }
      },
      (err) => {
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(this.getCounty.bind(this, id));
        }
      }
    );
  }

  onChangeClient(data) {
    const val = 'data';
    console.log(this.singleForm.value.clientName);

    this.getsubproducts(this.singleForm.value.clientName);
    this.productService
      .getProductByClient(this.singleForm.value.clientName)
      .subscribe(
        (res) => {
          // console.log("data",res[i]);
          this.prodctdata = res[val];
          if (this.isedit) {
            this.prodctdata.map((ele, i) => {
              console.log(i, 'index');
              const proddata = this.orderdata.productArray;
              for (const iterator of proddata) {
                ele.status =
                  ele.productName === iterator.productName ? true : false;
                if (ele.status === true) {
                  this.prodArr.push(ele);
                  break;
                }
              }
            });
            console.log(this.prodArr, 'prodarray');
          }
        },
        (err) => {
          if (err.status === 401 && err.error.error === 'invalid_token') {
            this.authenticationService.recallApi(
              this.onChangeClient.bind(this, data)
            );
          }
        }
      );
  }

  getsubproducts(id) {
    this.productService.getproductsubproducts(id).subscribe(
      (res) => {
        const val = 'data';
        this.subroducts = res[val];
      },
      (err) => {
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(
            this.getsubproducts.bind(this, id)
          );
        }
      }
    );
  } // Initialize form for employee details
  createEmployee(): FormGroup {
    return this.fb.group({
      id: [null],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      orderSellerType: [null, Validators.required],
    });
  }
  // Get all product list
  getProducts() {
    if (this.action === 'Add') {
      this.productService.getAllProducts().subscribe(
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
  }

  // Select expected date and validation
  ondatechange() {
    const date: any = new Date();
    if (
      this.singleForm.value.fromDate !== '' &&
      this.singleForm.value.expectedDate !== ''
    ) {
      const fromdate = this.datepipe.transform(
        this.singleForm.value.fromDate,
        'MM/dd/yyyy'
      );
      const expecteddate = this.datepipe.transform(
        this.singleForm.value.expectedDate,
        'MM/dd/yyyy'
      );
      console.log(expecteddate, fromdate, 'dates');

      const isFromDate = expecteddate < fromdate || expecteddate === fromdate;
      if (isFromDate) {
        // this.singleForm.patchValue({ expectedDate: '' });
      } else {
        this.calculateNumberDays();
      }
    }
  }
  // Calculate total number of days
  calculateNumberDays() {
    const fromDate = this.singleForm.value.fromDate;
    const expectedDate = this.singleForm.value.expectedDate;

    const diffDays = Math.abs(
      Math.floor(
        (Date.UTC(
          fromDate.getFullYear(),
          fromDate.getMonth(),
          fromDate.getDate()
        ) -
          Date.UTC(
            expectedDate.getFullYear(),
            expectedDate.getMonth(),
            expectedDate.getDate()
          )) /
          (1000 * 60 * 60 * 24)
      )
    );
    console.log(diffDays);

    this.singleForm.controls.noOfDays.setValue(diffDays);
  }

  // Save or edit single order
  saveData() {
    this.submitted = true;
    console.log(this.singleForm.value);

    if (this.singleForm.invalid || this.prodArr.length === 0) {
      return;
    }
    const test: any[] = [];
    const orderdata = this.singleForm.value;
    this.prodArr.filter((ele) => {
      for (const iterator of this.subroducts) {
        if (ele.productName === iterator.product.productName) {
          test.push(iterator.id);
        }
      }
    });
    console.log(test, 'test');

    const data = {
      id: orderdata.id,
      clientId: orderdata.clientName,
      recievedDate: this.datepipe.transform(orderdata.fromDate, 'yyyy-MM-dd'),
      endCustomerOrder: orderdata.customerOrder,
      clientOrderNumber: orderdata.clientOrderNo,
      apn: orderdata.apn,
      city: orderdata.city,
      stateId: orderdata.state.id,
      countyName: orderdata.county,
      zip: orderdata.zip,
      legalDesc: orderdata.legalDesrc,
      rawAddress: orderdata.address,
      comments: orderdata.comment,
      orderType: orderdata.type,
      priorityId: orderdata.priorityName.id,
      expectedDeliveryDate: this.datepipe.transform(
        orderdata.expectedDate,
        'yyyy-MM-dd'
      ),
      subProductId: test,
      sellerBuyer: orderdata.candidates,
    };
    if (this.action === 'Add') {
      delete data.id;
      if (data.sellerBuyer.length > 0) {
        data.sellerBuyer.forEach((element) => {
          delete element.id;
        });
      }
    }
    this.loading = true;
    // console.log(data, 'order data');
    this.orderService.saveOrEditOrder(data).subscribe(
      (response) => {
        // console.log(response, 'data');
        const val = 'status';
        this.loading = false;
        if (response[val] === 'OK') {
          this.passEntry.emit('ok');
          this.activeModal.close();
          this.action === 'Add'
            ? this.toastr.success('Record added successfully')
            : this.toastr.success('Record edited successfully');
        }
      },
      (err) => {
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(this.saveData.bind(this));
        }
        this.loading = false;
        if (err.error.message) {
          this.toastr.error(err.error.message);
        }
      }
    );
  }

  // add employees
  addEmployee(): void {
    this.employeeForm = this.singleForm.get('candidates') as FormArray;
    this.employeeForm.push(this.createEmployee());
  }
  getTitle() {
    if (this.action === 'Edit') {
      return `Edit Order`;
    }
    return 'Add New Order';
  }
  // delete form array
  removeEmployee(index): void {
    console.log(index);
    this.employeeForm.removeAt(index);
  }
  open() {
    this.modalReference = this.modalService.open(this.content, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      windowClass: 'custom-class',
    });
    this.modalReference.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );

    function negativeValueRenderer(
      instance,
      td,
      row,
      col,
      prop,
      value,
      cellProperties
    ) {
      const pattern = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
      const regexp = new RegExp(pattern);
      Handsontable.renderers.TextRenderer.apply(this, arguments);
      if (
        prop === 'Client Name Type' ||
        prop === 'End Customer Order Number' ||
        prop === 'Client order number' ||
        prop === 'Received Date' ||
        prop === 'Product Category' ||
        prop === 'Type' ||
        prop === 'Address' ||
        prop === 'County' ||
        prop === 'State' ||
        prop === 'Zip code' ||
        prop === 'Priority' ||
        prop === 'Expected Delivery date'
      ) {
        if (!value || value === '') {
          td.style.background = '#f226266e';
        } else {
          td.style.background = '';
        }
      } else {
        td.style.background = '';
      }

      if (prop === 'Received Date' || prop === 'Expected Delivery date') {
        if (!moment(value, 'MM/DD/YYYY', true).isValid()) {
          td.style.background = '#f226266e';
        } else {
          td.style.background = '';
        }
      }

      if (prop === 'Client Name Type') {
        if (regexp.test(value)) {
          td.style.background = '';
        } else {
          td.style.background = '#f226266e';
        }
      }
    }

    const count = 0;
    this.handsontable = new Handsontable(
      document.getElementById('handsontable'),
      {
        data: this.dataset,
        colHeaders: this.header,
        height: 450,
        stretchH: 'all',
        manualColumnResize: true,
        manualRowResize: true,
        contextMenu: ['row_above', 'row_below', 'remove_row'],
        manualRowMove: true,
        bindRowsWithHeaders: 'strict',
        columnSorting: true,
        columns: this.column,
        afterInit: () => {
          this.handsontableinit();
        },
        cells: (row, col, prop: any) => {
          const cellProperties = {};
          const key = 'renderer';
          cellProperties[key] = negativeValueRenderer;
          return cellProperties;
        },
      }
    );
  }
  saveBulkData() {
    this.Bulksubmitted = true;
    if (this.bulkForm.invalid) {
      return;
    }
    this.passEntry.emit('ok');
    this.createBulkData();
  }

  createBulkData() {
    const params = new FormData();
    const data: any = {
      clientId: this.bulkForm.value.clientName.id,
    };

    params.append('data', JSON.stringify(data));
    params.append('bulkOrderFile', this.bulkfile);

    this.orderService.saveOrEditBulkOrder(params).subscribe(
      (response) => {
        // console.log(response, 'data');
        const val = 'status';
        this.loading = false;
        if (response[val] === 'OK') {
          this.passEntry.emit('ok');
          this.activeModal.close();
          this.action === 'Add'
            ? this.toastr.success('Record added successfully')
            : this.toastr.success('Record edited successfully');
        }
      },
      (err) => {
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(this.saveData.bind(this));
        }
        this.loading = false;
        if (err.error.message) {
          this.toastr.error(err.error.message);
        }
      }
    );
  }
  handsontableinit() {
    const pattern = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
    const regexp = new RegExp(pattern);
    const temp =
      this.dataset.filter((ele) => {
        return (
          moment(ele['Received Date'], 'MM/DD/YYYY', true).isValid() &&
          moment(ele['Expected Delivery date'], 'MM/DD/YYYY', true).isValid() &&
          regexp.test(ele['Client Name Type'])
          // ele['Client Name Type'].match(pattern)
        );
      }).length === this.dataset.length;
    if (!temp) {
      this.toaster.error('Invalid type');
    }
    this.contactsFileName = this.tempfilename;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  onChangeProduct(e, i) {
    if (e.target.checked) {
      this.prodArr.push(this.prodctdata[i]);
    } else {
      this.prodArr.splice(this.prodArr.indexOf(this.prodctdata[i]), 1);
    }
    this.prodctdata[i].status = e.target.checked ? true : false;
  }
  detectChanges = (hotInstance, changes, source) => {
    // console.log(changes, this.dataset);
  }
  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = evt.target as DataTransfer;
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    this.tempfilename = evt.target.files[0].name;
    this.bulkfile = evt.target.files[0];
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bstr, {
        type: 'array',
        cellDates: true,
        cellNF: false,
        cellText: false,
      });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      /* save data */
      let heading = [];
      heading = XLSX.utils.sheet_to_json(ws, { raw: true, header: 1 });
      this.dataset = XLSX.utils.sheet_to_json(ws, {
        raw: false,
        dateNF: 'mm/dd/yyyy',
      });

      const header = heading[0];
      let headerMatch = false;
      header.forEach((element) => {
        if (!this.header.includes(element)) {
          // console.log('false', element);
          headerMatch = true;
          this.dataset = [];
          this.defaultDateset = [];
          this.tempfilename = '';
          this.toaster.error('Invalid File Header');
        }
      });
      if (!headerMatch) {
        if (this.dataset.length) {
          this.defaultDateset = JSON.parse(JSON.stringify(this.dataset));
          this.open();
        } else {
          this.toaster.error('File is Empty');
        }
      }
    };

    reader.readAsArrayBuffer(target.files[0]);
    evt.target.value = '';
  }

  Confirm() {
    this.defaultDateset = JSON.parse(JSON.stringify(this.dataset));
    console.log(this.defaultDateset, 'fghf');
  }
  Cancel() {
    this.dataset = JSON.parse(JSON.stringify(this.defaultDateset));
  }
  selectedItem(item) {
    console.log(item); // api integration
    // this.singleForm.controls.county.setValue('');
    if (item) {
      this.getCounty(item.id);
    }
  }
  clearState() {
    this.singleForm.controls.county.setValue('');
  }
}
