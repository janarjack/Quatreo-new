import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivityLogService } from 'src/app/core/activity-log/activity-log.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DatePipe } from '@angular/common';
import { date } from '@rxweb/reactive-form-validators';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-add-activity-log',
  templateUrl: './add-activity-log.component.html',
  styleUrls: ['./add-activity-log.component.scss'],
})
export class AddActivityLogComponent implements OnInit {
  overtimeForm: FormGroup;
  mintime = '';
  submitted;
  selectCategory = [];
  loading = false;
  loginTime: any;
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
  // mintime="00:00"
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private activityService: ActivityLogService,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private datepipe: DatePipe
  ) {}

  ngOnInit() {
    this.createForm();
    this.loginTime = sessionStorage.getItem('loginTime');
    this.selectCategory = [
      'Training',
      'Lunch/Dinner',
      'Adhoc Break',
      'Meetings',
      'Fun Activities',
    ];
  }

  tConvert(time) {
    const zero = '00';
    let timeString = time;
    const H = +timeString.substr(0, 2);
    const h = H === 24 ? +zero : H;
    return (timeString = h + timeString.substr(2, 3));
  }
  createForm() {
    this.overtimeForm = this.fb.group({
      id: [sessionStorage.getItem('uid')],
      category: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      logComments: ['', Validators.required],
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

  // get validations for overtime form
  get form() {
    return this.overtimeForm.controls;
  }

  saveData() {
    this.submitted = true;
    if (this.overtimeForm.invalid) {
      return;
    }
    console.log(this.overtimeForm.value, 'overtime value');

    const details = this.overtimeForm.value;
    const data = {
      userId: Number(sessionStorage.getItem('uid')),
      category: details.category,
      loginTime: this.loginTime,
      startTime: this.tConvert(details.startTime),
      endTime: this.tConvert(details.endTime),
      logComments: details.logComments,
      activityDate: new Date(),
    };
    this.loading = true;
    this.activityService.saveOrEditLog(data).subscribe(
      (response) => {
        console.log(response, 'data');
        const val = 'status';
        this.loading = false;
        if (response[val] === 'OK') {
          this.passEntry.emit('ok');
          this.activeModal.close();
          this.toastr.success('Record added successfully');
        }
      },
      (err) => {
        console.log(err, 'data');
        // const msg = err['message'];
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(this.saveData.bind(this));
        }
        this.loading = false;
        if (err.error.message) {
          this.toastr.error(err.error.message);
        }
      }
    );
    this.passEntry.emit('ok');
  }
  closed() {
    console.log('closed');
  }
}
