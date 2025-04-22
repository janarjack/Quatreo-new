import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OvertimeScreenService } from 'src/app/core/overtime-screen/overtime-screen.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
// import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-add-overtime',
  templateUrl: './add-overtime.component.html',
  styleUrls: ['./add-overtime.component.scss'],
})
export class AddOvertimeComponent implements OnInit {
  @Input() public OTdata;
  @Input() public action;
  overtimeForm: FormGroup;
  submitted;
  mintime = '';
  userData;
  isloading = false;
  selectUsers = [];
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  darkTheme: NgxMaterialTimepickerTheme = {
    container: {
      buttonColor: '#e33a35',
    },
    dial: {
      dialBackgroundColor: '#232831',
      dialEditableActiveColor: '#e33a35',
    },
    clockFace: {
      clockHandColor: '#e33a35',
    },
  };
  dateTimeValue: Date = new Date();

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private OvertimeService: OvertimeScreenService,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private datepipe: DatePipe
  ) {}

  ngOnInit() {
    this.getUsersById();
    this.createForm();
  }
  createForm() {
    this.overtimeForm = this.fb.group({
      userName: [
        this.action === 'Add' ? null : this.OTdata.id,
        Validators.required,
      ],
      startTime: [
        this.action === 'Add' ? '' : new Date(this.OTdata.startTime),
        Validators.required,
      ],
      endTime: [
        this.action === 'Add' ? '' : new Date(this.OTdata.endTime),
        Validators.required,
      ],
      logComments: [
        this.action === 'Add' ? null : this.OTdata.logComments,
        Validators.required,
      ],
    });

    this.overtimeForm.get('startTime').valueChanges.subscribe((ele) => {
      if (this.overtimeForm.value.endTime.length) {
        const startTime = this.tConvert(ele);
        const endTime = this.tConvert(this.overtimeForm.value.endTime);
        if (moment(startTime, 'HH:mm') >= moment(endTime, 'HH:mm')) {
          this.overtimeForm.controls.endTime.setValue('', {
            emitEvent: false,
          });
          return this.toastr.error('End time must be greater than Start time');
        }
      }
    });

    this.overtimeForm.get('endTime').valueChanges.subscribe((ele) => {
      const startTime = this.tConvert(this.overtimeForm.value.startTime);
      const endTime = this.tConvert(ele);
      if (moment(startTime, 'HH:mm') >= moment(endTime, 'HH:mm')) {
        this.overtimeForm.controls.endTime.setValue('', {
          emitEvent: false,
        });
        return this.toastr.error('End time must be greater than Start time');
      }
    });
  }

  tConvert(time) {
    const zero = '00';
    let timeString = time;
    const H = +timeString.substr(0, 2);
    const h = H === 24 ? +zero : H;
    return (timeString = h + timeString.substr(2, 3));
  }
  // get validations for overtime form
  get form() {
    return this.overtimeForm.controls;
  }

  getUsersById() {
    const id = sessionStorage.getItem('uid');
    this.OvertimeService.getUserById(id).subscribe(
      (res) => {
        const val = 'data';
        this.selectUsers = res[val];
      },
      (err) => {
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(this.getUsersById.bind(this));
        }
      }
    );
  }

  createOTLog() {
    this.isloading = true;
    let data;

    data = {
      userId: this.overtimeForm.value.userName,
      startTime: this.tConvert(this.overtimeForm.value.startTime),
      endTime: this.tConvert(this.overtimeForm.value.endTime),
      logComments: this.overtimeForm.value.logComments,
      otLogDate: new Date(),
    };
    console.log('data', data, this.overtimeForm);
    if (this.action === 'Add') {
      delete data.id;
    }

    this.OvertimeService.saveOrEditOTLog(data).subscribe(
      (response) => {
        console.log(response, 'data');
        const val = 'status';
        this.isloading = false;
        if (response[val] === 'OK') {
          this.passEntry.emit('ok');
          this.activeModal.close();
          this.action === 'Add'
            ? this.toastr.success('Record added successfully')
            : this.toastr.success('Record edited successfully');
        }
      },
      (err) => {
        console.log(err, 'data');
        this.isloading = false;
        const msg = err.message;
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(this.createOTLog.bind(this));
        }
        if (err.error.message) {
          this.toastr.error(err.error.message);
        }
      }
    );
  }

  saveData() {
    this.submitted = true;
    if (this.overtimeForm.invalid) {
      return;
    }
    this.createOTLog();
    // this.passEntry.emit("ok");
  }
}
