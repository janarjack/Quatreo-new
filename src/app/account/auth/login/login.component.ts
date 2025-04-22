import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../core/services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private datepipe: DatePipe
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'
          ),
        ],
      ],
      password: ['', [Validators.required]],
    });
    // reset login status
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  ngAfterViewInit() {
    document.body.classList.add('authentication-bg');
    document.body.classList.add('authentication-bg-pattern');
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService
      .login(this.f.email.value, this.f.password.value)
      .subscribe(
        (data) => {
          this.error = '';
          console.log(data);
          sessionStorage.setItem('currentUser', JSON.stringify(data.body));
          sessionStorage.setItem('email', this.f.email.value);
          this.getuserinfo(this.f.email.value);
          this.router.navigate([this.returnUrl]);
          this.toastr.success('You are successfully logged in');
        },
        (error) => {
          console.log(error);
          this.error = error.error.error_description;
          this.loading = false;
        }
      );
  }
  getuserinfo(email) {
    this.authenticationService.getUserInfo(email).subscribe(
      (data) => {
        const val = 'data';
        sessionStorage.userPermission = JSON.stringify(
          data[val].userPermissions
        );
        sessionStorage.uid = data[val].userProfile.id;
        sessionStorage.setItem(
          'loginTime',
          this.datepipe.transform(data[val].userProfile.firstLogin, 'HH:mm')
        );
        sessionStorage.setItem('role', data[val].role.roleName);
      },
      (err) => {
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(this.getuserinfo.bind(this));
        }
      }
    );
  }
}
