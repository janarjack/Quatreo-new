import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TeamMemberService } from 'src/app/core/team-member-screen/team-member.service';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private teamService: TeamMemberService,
    private datepipe: DatePipe,
    private toaster: ToastrService,
    private authenticationService: AuthenticationService,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal
  ) {}
  // get validations for client form
  get form() {
    return this.orderForm.controls;
  }
  get candidates(): FormArray {
    return this.orderForm.get('candidates') as FormArray;
  }
  @Input() public orderdata;
  orderForm: FormGroup;
  employeeForm: FormArray;
  hasFormErrors = false;
  submitted = false;
  codeAttachment = [];
  statusdata = [];
  subproducts = [];
  loading = false;
  isloading = false;
  pdf: any;
  imgext: any[] = ['png', 'jpeg', 'jpg', 'svg'];
  image: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  orderfiles: any;

  recievedDate: any;

  ngOnInit() {
    this.subproducts = this.orderdata.userOrderDetails[1].productArray;
    this.getStatus();
    this.createForm();
  }
  // Intiazlize form
  createForm() {
    const details = this.orderdata.userOrderDetails[0];
    this.recievedDate = this.convertDateToString(
      details.userOrder.order.recievedDate
    );
    this.orderForm = this.fb.group({
      id: [details.userOrder.id],
      userId: [details.userOrder.assignedTo.id],
      clientOrder: [details.userOrder.order.clientOrderNumber],
      quatreoOrder: [details.userOrder.order.quatreoOrderNumber],
      receivedDate: [
        this.convertDateToString(details.userOrder.order.recievedDate),
      ],
      product: [''],
      type: [details.userOrder.order.orderType],
      ecd: [this.convertDateToString(details.userOrder.expectedClosingDate)],
      attachment: [''],
      tax: [
        details.userOrder.taxAmount,
        Validators.pattern(/^[0-9]+(.[0-9]+)?$/),
      ],
      deliquencyAmount: [
        details.userOrder.deliquencyAmount,
        Validators.pattern(/^[0-9]+(.[0-9]+)?$/),
      ],
      assessment: [details.userOrder.assesment],
      orderId: [details.userOrder.order.id],
      instruction: [''],
      sop: [''],
      links: [''],
      orderStatus: [details.userOrder.order.status.id],
      log: [details.userOrder.log],
      candidates: this.fb.array(
        this.orderdata.userOrderDetails[1].subProduct.map((item) => {
          console.log(item, 'item');
          const group = this.createsubproducts();
          group.patchValue({
            subProductId: item,
            statusId: item.orderAttachments
              ? item.orderAttachments.statusMaster
              : {
                  id: 11,
                  statusName: 'OPEN',
                  userOrderAttachment: true,
                  userOrder: false,
                  links: [],
                },
            userOrderId: details.userOrder.id,
            fileName: item.orderAttachments
              ? item.orderAttachments.fileName
              : '',
            nextActionDate: item.orderAttachments
              ? item.orderAttachments.nextActionDate !== null
                ? this.convertDateToString(item.orderAttachments.nextActionDate)
                : ''
              : '',
          });
          return group;
        })
      ),
    });

    this.orderForm.get('ecd').valueChanges.subscribe((values) => {
      if (
        !this.dateValidation(values, this.orderForm.controls.receivedDate.value)
      ) {
        this.toaster.error(
          'ECD date connot be smaller than or equal to the Received date'
        );
        this.orderForm.controls.ecd.setValue('');
      }
    });
  }

  // validate date with recieved date
  dateValidation(to, from) {
    if (moment(to).valueOf() <= moment(from).valueOf()) {
      return false;
    } else {
      return true;
    }
  }

  // get validations for form array
  // get candidates(): FormArray {
  // return this.orderForm.get('candidates') as FormArray;
  // }
  createsubproducts(): FormGroup {
    const form = this.fb.group({
      subProductId: [''],
      statusId: [''],
      userOrderId: [''],
      fileName: [''],
      nextActionDate: [''],
      // tenant: [{ id: this.RoleInfoService.getTenentId() }]
      // lender:[{id:this.user.candidates[0].lender.id}]
    });
    form.valueChanges.subscribe((data) => {
      if (!this.dateValidation(data.nextActionDate, this.recievedDate)) {
        this.toaster.error(
          'Next action date connot be smaller than or equal to the Received date'
        );
        form.get('nextActionDate').setValue('');
      }
    });

    return form;
  }
  // Get all status
  getStatus() {
    this.teamService.getAllStatus().subscribe(
      (response) => {
        const val = 'data';
        if (response[val]) {
          this.statusdata = response[val].filter((ele) => {
            return ele.userOrderAttachment === true;
          });
        }
        console.log(this.statusdata, 'gfhghg');

        // return this.statusdata;
      },
      (err) => {
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(this.getStatus.bind(this));
        }
      }
    );
  }
  // validate the form
  saveData() {
    this.submitted = true;
    if (this.orderForm.invalid) {
      return;
    }
    // this.passEntry.emit('ok');
    this.checkLineItemAttachemt();
    // this.createOrder();
  }
  // create or edit order details
  createOrder() {
    this.checkLineItemStatus();
    const orderdata = this.orderForm.value;
    this.orderfiles = JSON.parse(JSON.stringify(orderdata.candidates));
    const params = new FormData();
    const data: any = {
      id: orderdata.id,
      userId: orderdata.userId,
      orderId: orderdata.orderId,
      assessment: orderdata.assessment,
      orderStatusId: orderdata.orderStatus,
      taxAmount: orderdata.tax,
      deliquencyAmount: orderdata.deliquencyAmount,
      log: orderdata.log,
      ecdDate: this.datepipe.transform(orderdata.ecd, 'yyyy-MM-dd'),
      orderAttachment: this.orderfiles.filter((element) => {
        console.log(element, 'jgj');
        const dataEmpty =
          element.statusId &&
          element.subProductId &&
          element.subProductId.isActive === true;
        if (dataEmpty) {
          if (element.nextActionDate) {
            element.nextActionDate = this.datepipe.transform(
              element.nextActionDate,
              'yyyy-MM-dd'
            );
          }
          element.statusId = element.statusId.id;
          element.subProductId = element.subProductId.id;
          return element;
        } else {
          return;
        }
      }),
      // orderAttachment:orderdata.orderAttachment
    };

    this.isloading = true;
    this.teamService.saveOrder(data, this.codeAttachment).subscribe(
      (response) => {
        console.log(response, 'data');
        const val = 'status';
        this.isloading = false;
        if (response[val] === 'OK') {
          this.passEntry.emit('ok');
          this.activeModal.close();

          this.toastr.success('Record updated successfully');
        }
      },
      (err) => {
        console.log(err, 'data');
        // const msg = err['message'];
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(this.createOrder.bind(this));
        }
        this.isloading = false;
        if (err.error.message) {
          this.toastr.error(err.error.message);
        }
      }
    );
    console.log(data, this.orderfiles, orderdata.candidates);
  }

  checkLineItemAttachemt() {
    let attachmentAvailable;
    attachmentAvailable = this.orderForm.value.candidates.filter((ele) => {
      return ele.statusId.statusName === 'COMPLETED' && ele.fileName.length > 0;
    });

    let nextActionDateAvailable;
    nextActionDateAvailable = this.orderForm.value.candidates.filter((ele) => {
      return (
        ele.statusId.statusName === 'COMPLETED' &&
        JSON.stringify(ele.nextActionDate).length > 2
      );
    });
    let status;
    status = this.orderForm.value.candidates.filter((ele) => {
      return ele.statusId.statusName === 'COMPLETED';
    });

    let inPogress;
    inPogress = this.orderForm.value.candidates.filter((ele) => {
      return ele.statusId.statusName.startsWith('IN_PROGRESS');
    });

    let inprogressManditory;
    inprogressManditory = this.orderForm.value.candidates.filter((ele) => {
      return (
        ele.statusId.statusName.startsWith('IN_PROGRESS') &&
        (ele.fileName.length > 0 ||
          JSON.stringify(ele.nextActionDate).length > 2)
      );
    });

    if (
      attachmentAvailable.length !== status.length &&
      nextActionDateAvailable.length !== status.length
    ) {
      this.toaster.error(
        'Attachment and Next action date cannot be empty if status is completed'
      );
    } else if (inprogressManditory.length !== inPogress.length) {
      this.toaster.error(
        'Attachment or Next action date must be selected if status is inprogress'
      );
    } else if (attachmentAvailable.length !== status.length) {
      this.toaster.error('Attachment cannot be empty if status is completed');
    } else if (nextActionDateAvailable.length !== status.length) {
      this.toaster.error(
        'Next action date cannot be empty if status is completed'
      );
    } else {
      this.createOrder();
    }
  }

  checkLineItemStatus() {
    let isCompleted;
    isCompleted = this.orderForm.value.candidates.filter((ele) => {
      return ele.statusId.statusName === 'COMPLETED';
    });
    console.log(isCompleted, 'isCompleted');
    if (isCompleted.length === this.orderForm.value.candidates.length) {
      this.orderForm.controls.orderStatus.setValue(14);
    } else {
      this.orderForm.controls.orderStatus.setValue(3);
    }
  }
  // File upload for guidelines and validation for it
  fileChange(event, index, value) {
    let bytes;
    console.log(value);
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
      // value.fileName = event.target.files[0].name;
      this.codeAttachment[index] = event.target.files[0];
      const controlArray = this.orderForm.get('candidates') as FormArray;
      // controlArray.controls[index]
      //   .get('statusId')
      //   .setValue({ id: 2, statusName: 'WIP', links: [] });
      controlArray.controls[index]
        .get('fileName')
        .setValue(event.target.files[0].name);
      this.settrue(value.subProductId);
      // console.log(value.fileName.setValue(event.target.files[0].name));
    }
  }
  settrue(item) {
    item.isActive = !item.isActive ? true : item.isActive;
  }
  onchange(item) {
    item.isActive = !item.isActive;
  }
  ondatechange(item, index) {
    const controlArray = this.orderForm.get('candidates') as FormArray;
    if (controlArray.controls[index].get('nextActionDate').value) {
      this.settrue(item.subProductId);
    }
  }
  onCancel() {
    this.passEntry.emit('ok');
    this.activeModal.dismiss('Cross click');
  }

  // View file if it is pdf or an image
  ViewFile(file, content: string) {
    const ext = file.fileName.substr(file.fileName.lastIndexOf('.') + 1);
    this.image = '';
    this.pdf = '';
    this.loading = true;
    this.teamService.viewFile(file.id).subscribe(
      (res) => {
        const val = 'data';
        this.loading = false;
        if (ext === 'pdf') {
          const logo = 'data:application/pdf;base64,' + res[val].byteArray;
          this.pdf = this.sanitizer.bypassSecurityTrustResourceUrl(logo);
          this.modalService.open(content, { centered: true, size: 'lg' });
        } else if (this.imgext.indexOf(ext) !== -1) {
          const logo = 'data:image/jpeg;base64,' + res[val].byteArray;
          this.image = this.sanitizer.bypassSecurityTrustUrl(logo);
          this.modalService.open(content, { centered: true, size: 'lg' });
        } else {
          this.toaster.error('File format .' + ext + ' cannot be viewed');
        }
      },
      (err) => {
        this.loading = false;
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(
            this.ViewFile.bind(this, file, content)
          );
        }
        if (err.error.message) {
          this.toaster.error(err.error.message);
        }
      }
    );
  }

  convertDateToString(dateToBeConverted: string) {
    if (dateToBeConverted) {
      return new Date(dateToBeConverted.replace(/-/g, ' '));
    }
  }
}
