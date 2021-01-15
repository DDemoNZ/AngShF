import {Component, OnInit} from '@angular/core';
import {AuthServiceComponent} from '../../service/auth-service/auth-service.component';
import {ActivatedRoute, Router} from '@angular/router';
import {UserRequest} from '../../models/userRequest';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MyValidators} from './validators/myValidators';
import {placeholdersToParams} from '@angular/compiler/src/render3/view/i18n/util';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  styles: [`
        input.ng-touched.ng-invalid {border:solid red 2px}
    `]
})
export class RegistrationComponent implements OnInit {


  message: string;
  userRequest = new UserRequest();
  userRegForm: FormGroup;

  constructor(private authService: AuthServiceComponent,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {
    this.userRegForm = new FormGroup({
      username: new FormControl([], [Validators.required, Validators.minLength(3)]),
      password: new FormControl([], [Validators.required, Validators.minLength(3)]),
      email: new FormControl([], [Validators.email, Validators.required])
    });
  }

  ngOnInit(): void {
  }

  // ngOnInit(): void {
  //   this.userRegForm = new FormGroup({
  //     username: new FormControl(
  //       'Username',
  //       [Validators.required, Validators.minLength(1)])
  //     ,
  //     password: new FormControl(
  //       'Password',
  //       [Validators.required, Validators.minLength(5)])
  //     ,
  //     email: new FormControl(
  //       'Email',
  //       [Validators.required, Validators.minLength(1), MyValidators.restrictedEmails])
  //   });
  // }


  registration(): void {
    console.log(this.userRequest);
    this.authService.registration(this.userRequest).subscribe(
      res => {
        console.log('res ', res);
        this.userRegForm.reset();
      },
      error => {
        console.log('error ', error);
      });
  }

}
