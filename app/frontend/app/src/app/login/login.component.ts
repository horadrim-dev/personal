import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// import { UserService } from '../shared/services/user.service';
import { first } from 'rxjs/operators';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private _authService: AuthService
    ) { 

        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // reset login status
        this._authService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    ngOnInit() {

    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this._authService.login(this.f['username'].value, this.f['password'].value)
            .pipe(first())
            .subscribe({
                next: data => {
                    this.router.navigate([this.returnUrl]);
                },
                error: error => {
                    this.error = error;
                    this.loading = false;
                }
              });
    }
  /**
   * An object representing the user for the login form
   */
  // public user: any;

  // constructor(private _userService: UserService) {

  // }

  // ngOnInit() {
  //   this.user = {
  //     username: '',
  //     password: ''
  //   };
  // }

  // login() {
  //   this._userService.login({'username': this.user.username, 'password': this.user.password});
  // }
 
  // refreshToken() {
  //   this._userService.refreshToken();
  // }
 
  // logout() {
  //   this._userService.logout();
  // }
}
