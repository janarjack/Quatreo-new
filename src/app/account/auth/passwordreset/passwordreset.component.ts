import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.scss']
})
export class PasswordresetComponent implements OnInit, AfterViewInit {

  resetForm: FormGroup;
  submitted = false;
  error = '';
  success = '';
  loading = false;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService) { }

  ngOnInit() {

    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]],
    });
  }

  ngAfterViewInit() {
    document.body.classList.add('authentication-bg');
    document.body.classList.add('authentication-bg-pattern');
  }

  // convenience getter for easy access to form fields
  get f() { return this.resetForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.success = '';
    this.submitted = true;

    // stop here if form is invalid
    if (this.resetForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.forgotPassword(this.f.email.value)
      .pipe(first())
      .subscribe(
        data => {
          this.error = '';
          console.log(this.resetForm.value);
          setTimeout(() => {
            this.loading = false;
            this.success =
              'We\'ve emailed you instructions for setting your password, ' +
              'if an account exists with the ' +
              'email you entered. You should receive them shortly.\n If you don\'t receive an email,'
              + ' please make sure you\'ve entered the' +
              'address you registered with, and check your spam folder.';
          }, 1000);
        },
        error => {
          console.log(error);
          this.error = error;
          this.loading = false;
        });



  }
}
