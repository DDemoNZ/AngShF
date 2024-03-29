import { Component, OnInit } from '@angular/core';
import {AuthServiceComponent} from '../../service/auth-service/auth-service.component';
import {ActivatedRoute, Router} from '@angular/router';
import {UserRequest} from '../../models/userRequest';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MyValidators} from './validators/myValidators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


  message: string;
  userRequest = new UserRequest();
  userRegForm: FormGroup;

  constructor(private authService: AuthServiceComponent,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.userRegForm = new FormGroup({
      username: new FormControl(
        'Username',
        [Validators.required, Validators.minLength(1)])
      ,
      password: new FormControl(
        'Password',
        [Validators.required, Validators.minLength(5)])
      ,
      email: new FormControl(
        'Email',
        [Validators.required, Validators.minLength(1), MyValidators.restrictedEmails])
    });
  }


  registration(): void {
    this.authService.registration(this.userRequest).subscribe(res => {
      console.log(res);

      if (res.exception !== null) {
        this.message = res.exception;
      } else {
        this.message = '';
        this.router.navigate(['login']);
      }
    });
  }

}
