import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import {
  NgbActiveModal,
  NgbModal,
  ModalDismissReasons
} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { ManageProductService } from 'src/app/core/manage-product/manage-product.service';
import { ManageClientService } from 'src/app/core/manage-client/manage-client.service';
import { ManageOrderService } from 'src/app/core/manage-order/manage-order.service';
import { DatePipe } from '@angular/common';
import * as Handsontable from 'handsontable';
import { WeblinksService } from 'src/app/core/weblinks/weblinks.service';
import { log } from 'util';

@Component({
  selector: 'app-add-weblinks',
  templateUrl: './add-weblinks.component.html',
  styleUrls: ['./add-weblinks.component.scss']
})
export class AddWeblinksComponent implements OnInit {
  weblinkForm: FormGroup;
  stateId;
  countyId;
  constructor(
    public activeModal: NgbActiveModal,
    public fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private weblinkService: WeblinksService,

    private toastr: ToastrService
  ) {}
  // get validations for form array
  get candidates(): FormArray {
    return this.weblinkForm.get('candidates') as FormArray;
  }

  // get validations for single order form
  get form() {
    return this.weblinkForm.controls;
  }

  employeeForm: FormArray;
  submitted = false;

  isedit = false;
  loading = false;

  @Input() action: string;
  @Input() linksdata: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  county = [];
  state = [];
  ngOnInit() {
    this.isedit = this.action === 'Edit' ? true : false;
    this.createweblinkForm();
    this.getAllStates();
  }

  // initialize single order and bulk order form
  createweblinkForm() {
    this.weblinkForm = this.fb.group({
      state: [
        this.action === 'Add' ? '' : this.linksdata.order.county.state,
        Validators.required
      ],
      county: [
        this.action === 'Add' ? '' : this.linksdata.order.county.countyName,
        Validators.required
      ],
      candidates: this.fb.array(
        this.action === 'Add'
          ? [this.createLinks()]
          : this.linksdata.orderSellerMapArray.length > 0
          ? this.linksdata.orderSellerMapArray.map(item => {
              // console.log(item, 'item');
              const group = this.createLinks();
              group.patchValue(item);
              return group;
            })
          : []
      )
    });
    this.employeeForm = this.weblinkForm.get('candidates') as FormArray;
  }

  // Get all states
  getAllStates() {
    this.weblinkService.getAllStates().subscribe(
      res => {
        const val = 'data';
        if (res[val]) {
          this.state = res[val];
        }
      },
      err => {
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(this.getAllStates.bind(this));
        }
      }
    );
  }

  // Get all county based on state
  getCounty(id) {
    this.weblinkService.getAllCounty(id).subscribe(
      res => {
        const val = 'data';
        if (res[val]) {
          this.county = res[val];
        }
      },
      err => {
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(this.getCounty.bind(this, id));
        }
      }
    );
  }

  // filter state list
  onFilterState(event) {
    console.log(event);
    this.stateId = event ? event.id : '';
    this.getCounty(this.stateId);
    if (this.weblinkForm.get('county')) {
      this.weblinkForm.get('county').reset();
    }
  }

  // filter county list
  onFilterCounty(event) {
    console.log(event);
    this.countyId = event ? event.id : '';
  }

  // Initialize form for employee details
  createLinks(): FormGroup {
    return this.fb.group({
      countyId: [''],
      webLinkLabel: ['', Validators.required],
      webLinkURL: ['', Validators.required]
    });
  }

  // Save or edit single order
  saveData() {
    this.submitted = true;
    this.weblinkForm.controls.state.setValue(this.stateId);

    if (this.weblinkForm.invalid) {
      return;
    }
    const test: any[] = [];
    const linkdata = this.weblinkForm.value;
    linkdata.candidates.map(item => {
      item.countyId = this.countyId;
    });

    console.log(test, 'test');

    const data = {
      countyName: linkdata.county,
      countyWebLink: linkdata.candidates
    };

    this.loading = true;
    this.weblinkService.saveOrEditWeblinks(data).subscribe(
      response => {
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
      err => {
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
    this.employeeForm = this.weblinkForm.get('candidates') as FormArray;
    this.employeeForm.push(this.createLinks());
  }

  // delete form array
  removeEmployee(index): void {
    console.log(index);
    this.employeeForm.removeAt(index);
  }
}
