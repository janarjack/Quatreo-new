import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ManageUserService } from 'src/app/core/manage-user/manage-user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  private token: string;
  passwordForm: FormGroup;
  submitted = false;
  error = '';
  success = '';
  loading = false;
  constructor(private formBuilder: FormBuilder,
              public activeModal: NgbActiveModal,
              private route: ActivatedRoute,
              private router: Router,
              private userService: ManageUserService,
              private authenticationService: AuthenticationService,
              private toaster: ToastrService) { }

  ngOnInit() {
    // this.route.queryParams.subscribe(q => {
    //   this.token = q.token;
    //   console.log('queryParamMap token:::', this.token);
    // });
    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6),
      Validators.maxLength(15), Validators.pattern('^(?=.*[<>()$@$!%*?&]).{0,}')]],
      repassword: ['', Validators.required],
    }, {
      validator: this.MustMatch('password', 'repassword')
    });
  }

  // password match validation
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

   // convenience getter for easy access to form fields
   get f() { return this.passwordForm.controls; }



  // On submit form
  onSubmit() {
    this.success = '';
    this.submitted = true;

    // stop here if form is invalid
    if (this.passwordForm.invalid) {
      return;
    }
    this.loading = true;
    const payload = {
      oldPassword: this.passwordForm.value.oldPassword,
      newPassword: this.passwordForm.value.password,
      email: sessionStorage.getItem('email')
    };
    this.userService.changePassword(payload).subscribe(response => {
      const val = 'status';
      console.log(response);
      this.loading = false;
      if (response[val] === 'OK') {
        this.activeModal.close();
        this.toaster.success('change password successful');
      }
    }, (err) => {
      console.log(err, 'data');
      // const msg = err['message'];
      if (err.status === 401 && err.error.error === 'invalid_token') {
        this.authenticationService.recallApi(this.onSubmit.bind(this));
      }
      this.loading = false;
      if (err.error.message) {
        this.toaster.error(err.error.message);
      }
    });
  }

}
