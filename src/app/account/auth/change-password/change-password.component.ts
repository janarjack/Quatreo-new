import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, AfterViewInit {
  private token: string;
  passwordForm: FormGroup;
  submitted = false;
  error = '';
  success = '';
  loading = false;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private toaster: ToastrService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(q => {
      this.token = q.token;
      console.log('queryParamMap token:::', this.token);
    });
    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6),
      Validators.maxLength(15), Validators.pattern('^(?=.*[<>()$@$!%*?&]).{0,}')]],
      repassword: ['', Validators.required],
    }, {
      validator: this.MustMatch('password', 'repassword')
    });
  }

  ngAfterViewInit() {
    document.body.classList.add('authentication-bg');
    document.body.classList.add('authentication-bg-pattern');
  }

  // convenience getter for easy access to form fields
  get f() { return this.passwordForm.controls; }


  // validate reset token
  validateToken() {
    if (this.token) {
      this.authenticationService.validateToken(this.token).subscribe(response => {
        console.log(response);
      }, err => {
        this.toaster.error('Reset password link has been expired, Please try getting link again');
        this.router.navigate(['/account/login']);
      });
    }
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

  /**
   * On submit form
   */
  onSubmit() {
    this.success = '';
    this.submitted = true;

    // stop here if form is invalid
    if (this.passwordForm.invalid) {
      return;
    }
    this.loading = true;
    const payload = {
      newPassword: this.passwordForm.value.password,
      token: this.token
    };
    this.authenticationService.changePassword(payload).subscribe(response => {
      this.loading = false;
      if (typeof response !== 'undefined') {
        this.toaster.success('Reset password successful');
        this.router.navigate(['/account/login']);
      } else {
        // tslint:disable-next-line:max-line-length
        this.toaster.error('Reset password was not successful, Please try getting link again');
      }
    }, err => {
      this.loading = false;
      this.toaster.error('Reset password was not successful, Please try getting link again');
    });
  }

}
