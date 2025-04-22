import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { runInThisContext } from 'vm';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ToastrService } from 'ngx-toastr';
import { ManageClientService } from 'src/app/core/manage-client/manage-client.service';
import { ManageProductService } from 'src/app/core/manage-product/manage-product.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  @Input() public clientdata;
  userForm: FormGroup;
  employeeForm: FormArray;
  hasFormErrors = false;
  submitted = false;
  checkArray: FormArray;
  checkAllStatus = false;
  mlsArr = [];
  prodArr = [];
  cotractfile: any;
  guidelineFile: any;
  isMls = false;
  clientObj: any;
  urls = [];
  contractUrl = [];
  guidelineArray = [];
  contractArray = [];
  employeeId: any[] = [];
  statusdata = [
    {
      statusid: 1,
      statusValue: true,
      statusData: 'Active'
    },
    {
      statusid: 0,
      statusValue: false,
      statusData: 'In-Active'
    }
  ];
  loading = false;
  uploadedFiles: any[] = [];
  uploadedContractFiles: any[] = [];
  deletefileid: any[] = [];
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  constructor(
    public activeModal: NgbActiveModal,
    private manageClient: ManageClientService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private productService: ManageProductService,
    private authenticationService: AuthenticationService
  ) {}

  Data: Array<any> = [];
  prodctdata: Array<any> = [];
  abc: Array<any> = [{ id: 3, productName: 'Tax Cart', value: 'Tax Cart' }];

  // mask phone number to US format
  public mask = [
    '(',
    /[1-9]/,
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ];

  ngOnInit() {
    this.getProducts();
    this.getAllSubProducts(2);
    this.clientObj = this.clientdata.data;
    this.createForm(this.clientObj, this.clientdata.name);
    if (this.clientdata.name === 'edit') {
      this.uploadedFiles = this.clientObj.guidelinesFile;
      this.uploadedContractFiles = this.clientObj.contractsFile;
    }
  }
  // get all the products category
  getProducts() {
    this.productService.getAllProducts().subscribe(
      res => {
        const val = 'data';
        this.prodctdata = res[val];
        if (this.clientdata.name === 'add') {
          this.prodctdata.map(ele => {
            ele.status = false;
          });
          console.log(this.prodctdata, 'ressssssssss');
        } else {
          this.prodctdata.map((ele, i) => {
            console.log(i, 'index');

            const clientproddata = this.clientdata.data.clientProd;
            for (const iterator of clientproddata) {
              ele.status =
                ele.productName === iterator.productName ? true : false;
              if (iterator.productName === 'MLS') {
                this.isMls = true;
              }
              if (ele.status === true) {
                this.prodArr.push(ele);
                break;
              }
            }
          });
          console.log(this.prodArr, 'prodarray');
        }
      },
      err => {
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(this.getProducts.bind(this));
        }
      }
    );
  }
  // get all mls categories
  getAllSubProducts(id) {
    this.productService.getAllSubProducts(id).subscribe(
      res => {
        console.log(res, 'res');
        const val = 'data';
        this.Data = res[val];
        if (this.clientdata.name === 'add') {
          this.Data.map(ele => {
            ele.status = false;
          });
        } else {
          this.Data.map(ele => {
            const clientproddata = this.clientdata.data.clientSubProd;
            for (const iterator of clientproddata) {
              // console.log(this.Data, ele.subProductName, iterator.subProductName, 'sub');
              ele.status =
                ele.subProductName === iterator.subProductMaster.subProductName
                  ? true
                  : false;
              if (iterator.subProductMaster.subProductName === 'MLS') {
                this.isMls = true;
              }
              if (ele.status === true) {
                this.mlsArr.push(ele);
                break;
              }
            }
          });
        }
      },
      err => {
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(
            this.getAllSubProducts.bind(this, id)
          );
        }
      }
    );
  }
  // Intiazlize form
  createForm(data, name) {
    this.userForm = this.fb.group({
      id: [name === 'add' ? null : data.client.id],
      clientName: [
        name === 'add' ? data.clientName : data.client.clientName,
        Validators.required
      ],
      phoneNumber: [
        name === 'add'
          ? data.phoneNumber
          : data.client.phoneNumber
              .replace(/[^\d]+/g, '')
              .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3'),
        Validators.required
      ],
      candidates: this.fb.array(
        name === 'add'
          ? [this.createEmployee()]
          : data.clientEmp.map(item => {
              console.log(item, 'item');
              item.phone = item.phone
                .replace(/[^\d]+/g, '')
                .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
              const group = this.createEmployee();
              group.patchValue(item);
              return group;
            })
      ),
      emailId: [
        name === 'add' ? data.invoiceMail : data.client.invoiceMail,
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'
          )
        ]
      ],
      isActive: [name === 'add' ? true : data.client.active],
      notes: [name === 'add' ? '' : data.client.notes]
    });
    this.employeeForm = this.userForm.get('candidates') as FormArray;
    console.log(this.userForm.value, 'value');
  }
  // Initialize form for employee details
  createEmployee(): FormGroup {
    return this.fb.group({
      id: [null],
      firstName: [null, Validators.required],
      email: [
        null,
        [
          Validators.required,
          Validators.email,
          RxwebValidators.unique(),
          Validators.pattern(
            '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'
          )
        ]
      ],
      phone: [null, [Validators.required, RxwebValidators.unique()]]
    });
  }

  // Get validations for form array
  get candidates(): FormArray {
    return this.userForm.get('candidates') as FormArray;
  }
  // Get validations for client form
  get form() {
    return this.userForm.controls;
  }
  // Unmasking the phone numbers
  getUnmaskedphone(valueStr) {
    return valueStr.replace(/\D+/g, '');
  }
  // Validate the form
  saveData() {
    console.log(this.userForm.value, 'clientdata', this.urls.length);
    this.submitted = true;
    if (
      this.userForm.invalid ||
      this.prodArr.length === 0 ||
      (this.isMls && this.mlsArr.length === 0) ||
      (this.clientdata.name === 'add' && this.contractArray.length === 0) ||
      (this.clientdata.name === 'edit' &&
        this.contractArray.length === 0 &&
        this.uploadedContractFiles.length === 0)
    ) {
      return;
    }

    this.createClient();
  }
  // Create or edit client details
  createClient() {
    const test: any[] = [];
    this.mlsArr.forEach(ele => {
      test.push(ele.id);
    });
    this.prodArr.forEach(ele => {
      if (ele.productName !== 'MLS') {
        test.push(ele.id);
      }
    });
    const clientdata = this.userForm.value;
    clientdata.candidates.map(item => {
      item.phone = this.getUnmaskedphone(item.phone);
    });
    const params = new FormData();
    const data: any = {
      id: clientdata.id,
      clientName: clientdata.clientName,
      invoiceMail: clientdata.emailId,
      phoneNumber: this.getUnmaskedphone(clientdata.phoneNumber),
      subProductId: test,
      clientEmployees: clientdata.candidates,
      isActive: clientdata.isActive,
      notes: clientdata.notes
    };
    if (this.clientdata.name === 'add') {
      delete data.id;
      data.clientEmployees.forEach(element => {
        delete element.id;
      });
    }
    console.log(this.guidelineArray);

    // let clientObj: string = ;
    params.append('data', JSON.stringify(data));
    for (const file1 of this.contractArray) {
      params.append('contractsFile', file1);
    }
    for (const file of this.guidelineArray) {
      params.append('guidelinesFile', file);
    }
    // params.append('guidelineFileName', JSON.stringify(this.guidelineArray));
    this.loading = true;
    this.manageClient.saveOrEditClient(params).subscribe(
      response => {
        if (this.employeeId.length !== 0) {
          this.deleteClientEmp();
        }
        if (this.deletefileid.length !== 0) {
          this.deleteFileApi();
        }
        console.log(response, 'data');
        const val = 'status';
        this.loading = false;
        if (response[val] === 'OK') {
          this.passEntry.emit('ok');
          this.activeModal.close();
          this.clientdata.name === 'add'
            ? this.toastr.success('Record added successfully')
            : this.toastr.success('Record edited successfully');
        }
        this.contractArray = [];
        this.guidelineArray = [];
      },
      err => {
        console.log(err, 'data');
        // const msg = err['message'];
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(this.createClient.bind(this));
        }
        this.loading = false;
        if (err.error.message) {
          this.toastr.error(err.error.message);
        }
      }
    );
  }
  // Delete clients employees
  deleteClientEmp() {
    const data = {
      clientEmployeeId: this.employeeId
    };
    this.manageClient.deleteEmployee(data).subscribe(
      res => {
        console.log(res);
      },
      err => {
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(this.deleteClientEmp.bind(this));
        }
        if (err.error.message) {
          this.toastr.error(err.error.message);
        }
      }
    );
  }
  // File upload for guidelines and validation for it
  fileChange(event) {
    let bytes = 0;
    const bulkfile = [];
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const filesAmount = event.target.files.length;
    for (let val = 0; val < filesAmount; val++) {
      bytes = event.target.files[val].size;
      if (bytes === 0) {
        return '0 Byte';
      }
      const i = Math.floor(Math.log(bytes) / Math.log(1024));
      const fileSize = bytes / Math.pow(1024, i);
      console.log(fileSize, 'filesize');
      if (event.target.files[val].name.length > 100) {
        this.toastr.error(
          'File name of ' +
            '"' +
            event.target.files[val].name +
            '"' +
            ' is greater than 100 characters!'
        );
      } else if (sizes[i] === 'MB' && fileSize > 25) {
        this.toastr.error(
          event.target.files[val].name + ' is greater than 25 MB'
        ); // incase we want to display filename
      } else {
        this.guidelineArray.push(event.target.files[val]);
      }
    }
  }
  // Delete uploaded files (guidelines / contracts)
  deleteFiles(file, type, index) {
    if (file.id !== null) {
      this.deletefileid.push(file.id);
    }
    if (type === 'guidelines') {
      this.uploadedFiles.splice(index, 1);
    } else {
      this.uploadedContractFiles.splice(index, 1);
    }
  }

  // Delete file API
  deleteFileApi() {
    const data = {
      clientGuideLineContractId: this.deletefileid
    };
    this.manageClient.deleteFile(data).subscribe(
      res => {
        console.log(res);
      },
      err => {
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(this.deleteFileApi.bind(this));
        }
        if (err.error.message) {
          this.toastr.error(err.error.message);
        }
      }
    );
  }
  // File upload for contract with Validations
  contractFiles(event) {
    let bytes;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    bytes = event.target.files[0].size;
    if (bytes === 0) {
      return '0 Byte';
    }
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const fileSize = bytes / Math.pow(1024, i);
    if (event.target.files[0].name.length > 100) {
      this.toastr.error(
        'File name of ' +
          '"' +
          event.target.files[0].name +
          '"' +
          ' is greater than 100 characters!'
      );
    } else if (sizes[i] === 'MB' && fileSize > 25) {
      this.toastr.error(event.target.files[0].name + ' is greater than 25 MB');
    } else {
      this.contractArray = event.target.files;
    }
  }
  // delete guidelines files
  deleteFile(index) {
    this.guidelineArray.splice(index, 1);
  }

  // delete contract files
  deleteContractFile(index) {
    this.contractArray = [];
  }

  // To add employees for client
  addEmployee(): void {
    this.employeeForm = this.userForm.get('candidates') as FormArray;
    if (this.employeeForm.length < 10) {
      this.employeeForm.push(this.createEmployee());
    } else {
      this.toastr.error('Maximum 10 employees can be added!');
    }
  }

  // Remove employee from the list
  removeEmployee(items, index): void {
    if (items.value.id !== null) {
      this.employeeId.push(items.value.id);
    }
    this.employeeForm.removeAt(index);
  }
  // Get title for popup either add or edit
  gettile() {
    if (this.clientdata.name === 'edit') {
      return `Edit Client`;
    }
    return 'Add New Client';
  }

  // Select MLS category
  onCheckboxChange(e, i) {
    this.checkAllStatus = false;
    if (e.target.checked) {
      this.mlsArr.push(this.Data[i]);
    } else {
      this.mlsArr.splice(this.mlsArr.indexOf(this.Data[i]), 1);
    }
    this.Data[i].status = e.target.checked ? true : false;
    if (this.mlsArr.length === 0) {
      this.checkAllStatus = false;
    }
  }

  // Check all MLS category
  checkAll(e) {
    const checked = e.target.checked ? true : false;
    this.Data.forEach(item => (item.status = checked));
    this.mlsArr = e.target.checked ? Object.assign(this.mlsArr, this.Data) : [];
    this.checkAllStatus = e.target.checked ? true : false;
  }

  // Select product
  onChangeProduct(e, i) {
    if (e.target.value === 'MLS') {
      this.isMls = e.target.checked ? true : false;
      if (!e.target.checked) {
        this.Data.forEach(item => (item.status = false));
        this.mlsArr = [];
        this.checkAllStatus = false;
      }
    }
    if (e.target.checked) {
      this.prodArr.push(this.prodctdata[i]);
    } else {
      this.prodArr.splice(this.prodArr.indexOf(this.prodctdata[i]), 1);
    }
    this.prodctdata[i].status = e.target.checked ? true : false;
  }
}
