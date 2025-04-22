import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';
import {
  NgbDate,
  NgbCalendar,
  NgbActiveModal
} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tl-filter-screen',
  templateUrl: './tl-filter-screen.component.html',
  styleUrls: ['./tl-filter-screen.component.scss']
})
export class TlFilterScreenComponent implements OnInit {
  filterForm: FormGroup;
  sizeOptions: Array<any> = [
    { name: '5', value: 5 },
    { name: '10', value: 10 },
    { name: '25', value: 25 }
  ];
  // Component datepicker
  hoveredDate: NgbDate;
  fromNGDate: NgbDate;
  toNGDate: NgbDate;
  hidden: boolean;
  selected: any;
  @Input() fromDate: Date;
  @Input() toDate: Date;
  @Output() dateRangeSelected: EventEmitter<{}> = new EventEmitter();
  @ViewChild('dp', { static: true }) datePicker: any;
  // Select2 Dropdown
  selectValue: string[];
  submitted: boolean;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit() {
    this.selected = '';
    this.hidden = true;
    this.createForm();
  }

  createForm() {
    this.filterForm = this.fb.group({
      client: [''],
      dateRange: [''],
      clientOrder: [''],
      user: [''],
      status: ['']
    });
  }

  get form() {
    return this.filterForm.controls;
  }

  saveData() {
    this.submitted = true;
    if (this.filterForm.invalid) {
      return;
    }
    // this.passEntry.emit("ok");
  }

  // clear filterForm element
  clear() {
    this.filterForm.controls.client.setValue('');
    this.filterForm.controls.user.setValue('');
    this.filterForm.controls.status.setValue('');
    this.filterForm.controls.clientOrder.setValue('');
  }

  /**
   * on date selected
   * @param date date object
   */
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromNGDate = date;
      this.fromDate = new Date(date.year, date.month - 1, date.day);
      this.selected = '';
    } else if (this.fromDate && !this.toDate && date.after(this.fromNGDate)) {
      this.toNGDate = date;
      this.toDate = new Date(date.year, date.month - 1, date.day);
      this.hidden = true;
      this.selected =
        this.fromDate.toLocaleDateString() +
        '-' +
        this.toDate.toLocaleDateString();
      this.dateRangeSelected.emit({
        fromDate: this.fromDate,
        toDate: this.toDate
      });
      this.fromDate = null;
      this.toDate = null;
      this.fromNGDate = null;
      this.toNGDate = null;
    } else {
      this.fromNGDate = date;
      this.fromDate = new Date(date.year, date.month - 1, date.day);
      this.selected = '';
    }
  }
  /**
   * Is hovered over date
   * @param date date obj
   */
  isHovered(date: NgbDate) {
    return (
      this.fromNGDate &&
      !this.toNGDate &&
      this.hoveredDate &&
      date.after(this.fromNGDate) &&
      date.before(this.hoveredDate)
    );
  }

  /**
   * @param date date obj
   */
  isInside(date: NgbDate) {
    return date.after(this.fromNGDate) && date.before(this.toNGDate);
  }

  /**
   * @param date date obj
   */
  isRange(date: NgbDate) {
    return (
      date.equals(this.fromNGDate) ||
      date.equals(this.toNGDate) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }
}
