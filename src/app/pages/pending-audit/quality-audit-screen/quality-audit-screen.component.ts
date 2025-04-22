import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { TeamMemberService } from 'src/app/core/team-member-screen/team-member.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { PendingForAuditService } from 'src/app/core/pending-for-audit/pending-for-audit.service';

@Component({
  selector: 'app-quality-audit-screen',
  templateUrl: './quality-audit-screen.component.html',
  styleUrls: ['./quality-audit-screen.component.scss'],
})
export class QualityAuditScreenComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private authenticationService: AuthenticationService,
    private teamService: TeamMemberService,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private auditService: PendingForAuditService
  ) { }
  // get validations for form array
  get candidates(): FormArray {
    return this.auditScreenForm.get('candidates') as FormArray;
  }
  // get validations for client form
  get form() {
    return this.auditScreenForm.controls;
  }
  @Input() public orderdata;
  auditScreenForm: FormGroup;
  employeeForm: FormArray;
  hasFormErrors = false;
  submitted = false;
  loading = false;
  pdf: any;
  imgext: any[] = ['png', 'jpeg', 'jpg', 'svg'];
  image: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  recievedDate: any;
  subproducts = [];
  accurateList = [
    {
      name: 'Yes',
      val: true,
    },
    {
      name: 'No',
      val: false,
    },
  ];



  errorFeildsDisable = true;

  ngOnInit() {
    this.subproducts = this.orderdata.userOrderDetails[1].productArray;
    this.createForm();
  }

  // Intiazlize form
  createForm() {
    const details = this.orderdata.userOrderDetails[0];
    this.recievedDate = this.convertDateToString(
      details.userOrder.order.recievedDate
    );
    this.auditScreenForm = this.fb.group({
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
      tax: [details.userOrder.taxAmount],
      deliquencyAmount: [details.userOrder.deliquencyAmount],
      assessment: [details.userOrder.assesment],
      orderId: [details.userOrder.order.id],
      instruction: [''],
      sop: [''],
      links: [''],
      orderStatus: [details.userOrder.order.status.id],
      log: [details.userOrder.log],
      accurate: [this.orderdata.userOrderDetails[4].orderAuditMap[0].accurate],
      errorFeilds: this.fb.array([this.createEmployee()]),
      candidates: this.fb.array(
        this.orderdata.userOrderDetails[1].subProduct.map((item) => {
          console.log(item, 'item');
          const group = this.createsubproducts();
          group.patchValue({
            subProductId: item,
            statusId: item.orderAttachments
              ? item.orderAttachments.statusMaster.statusName
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
    // mlsCatergory : [this.clientdata.mlsCatergory,Validators.required]
  }
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

    return form;
  }

  // Initialize form for employee details
  createEmployee(): FormGroup {
    return this.fb.group({
      errroField: [''],
      errorData: [''],
      errorType: [''],
      errorRca: [''],
      correctiveSteps: [''],
    });
  }
  convertDateToString(dateToBeConverted: string) {
    if (dateToBeConverted) {
      return new Date(dateToBeConverted.replace(/-/g, ' '));
    }
  }
  editForm() { }
  saveData() {
    const data = {
      userId: this.auditScreenForm.value.userId,
      orderId: this.auditScreenForm.value.id,
      orderAuditId: this.orderdata.userOrderDetails[4].orderAuditMap[0].id,
      errorAuditArray: !this.auditScreenForm.value.accurate ? this.auditScreenForm.value.errorFeilds : [],
      isAccurate: this.auditScreenForm.value.accurate,
      statusId: this.auditScreenForm.value.accurate ? 13 : 12,
    };
    console.log(data, this.auditScreenForm);
    this.submitted = true;
    if (this.auditScreenForm.invalid) {
      return;
    }

    this.auditService.saveAuditDetails(data)
      .subscribe(
        response => {
          console.log(response);
          this.toaster.success('Successfully Updated');
          this.passEntry.emit('ok');
          this.activeModal.close();
        }, err => {
          if (err.status === 401 && err.error.error === 'invalid_token') {
            this.authenticationService.recallApi(this.saveData.bind(this));
          }
          if (err.error.message) {
            this.toaster.error(err.error.message);
          }
        });

    // this.passEntry.emit('ok');
  }
  fileChange(event) { }
  addEmployee(): void {
    this.employeeForm = this.auditScreenForm.get('errorFeilds') as FormArray;
    this.employeeForm.push(this.createEmployee());
  }
  removeEmployee(index): void {
    console.log(this.employeeForm.length);
    if (this.employeeForm.length > 1) {
      this.employeeForm.removeAt(index);
    } else {
      this.toaster.error('Should have atlaest one Error Feild');
    }


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
        if (res[val]) {
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
  viewOrderAttachments(file, content) {
    if (file.orderAttachments) {
      const ext = file.orderAttachments.fileName.substr(
        file.orderAttachments.fileName.lastIndexOf('.') + 1
      );
      this.image = '';
      this.pdf = '';
      this.loading = true;
      this.teamService.viewAttachment(file.orderAttachments.id).subscribe(
        (res) => {
          const val = 'data';
          this.loading = false;
          if (res[val]) {
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
          }
        },
        (err) => {
          this.loading = false;
          if (err.status === 401 && err.error.error === 'invalid_token') {
            this.authenticationService.recallApi(
              this.viewOrderAttachments.bind(this, file, content)
            );
          }
          if (err.error.message) {
            this.toaster.error(err.error.message);
          }
        }
      );
    } else {
      this.toaster.error('No attachment found');
    }
  }
  isAccurate(event) {
    console.log(event);

    if (!event) {
      this.errorFeildsDisable = false;
    } else {
      this.errorFeildsDisable = true;
      this.employeeForm = this.auditScreenForm.get('errorFeilds') as FormArray;
      this.employeeForm.clear();
      this.employeeForm.push(this.createEmployee());

    }

  }
}
