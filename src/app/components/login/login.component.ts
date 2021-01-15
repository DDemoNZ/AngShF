import { Component, OnInit } from '@angular/core';
import {AuthServiceComponent} from '../../service/auth-service/auth-service.component';
import {ActivatedRoute, Router} from '@angular/router';
import {UserRequest} from '../../models/userRequest';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
    styles: [`
        input.ng-touched.ng-invalid {border:solid red 2px}
    `]
})
export class LoginComponent implements OnInit {

  message: string;
  userRequest = new UserRequest();
  invalidLogin = false;
  form: FormGroup;

  constructor(private http: AuthServiceComponent,
              private router: Router,
              private route: ActivatedRoute) {
      this.form = new FormGroup({
          username: new FormControl([], [Validators.required, Validators.minLength(3)]),
          password: new FormControl([], [Validators.required, Validators.minLength(5)])
      });
  }

  ngOnInit(): void {
    // this.form = new FormGroup({
    //   username: new FormControl(
    //     'a',
    //     [Validators.required],
    //   )
    // });
  }

  authenticate(): void {
    console.log(this.userRequest);
    this.http.authenticate(this.userRequest).subscribe(
      res => {
        console.log('1');
        console.log(res);
        sessionStorage.setItem('id', res.id);
        sessionStorage.setItem('username', res.username);
        sessionStorage.setItem('role', res.roles.join());
        sessionStorage.setItem('generatedJwtToken', res.generatedJwtToken);
        this.form.reset();
        this.router.navigate(['/']);
      },
      error => {
        console.log('error response');
        console.log(error);
        this.router.navigate(['/error'], {state: {errorMsg: error.error.error + ', ' + error.error.message}});
        // this.router.navigate(['error'], {state: {errorMsg: error}});
    });
  }


}
