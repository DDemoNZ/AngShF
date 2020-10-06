import { Component, OnInit } from '@angular/core';
import {AuthServiceComponent} from '../../service/auth-service/auth-service.component';
import {ActivatedRoute, Router} from '@angular/router';
import {UserRequest} from '../../models/userRequest';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string;
  userRequest = new UserRequest();
  invalidLogin = false;
  form: FormGroup;

  constructor(private http: AuthServiceComponent,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(
        '',
        [Validators.required],
      )
    });
  }

  authenticate(): void {
    console.log(this.userRequest);
    this.http.authenticate(this.userRequest).subscribe(res => {
      console.log(res);
      if (res.exception !== null) {
        this.invalidLogin = true;
        this.message = res.exception;
        this.form.reset();
        this.http.setUser(res.user);
      } else {
        sessionStorage.setItem('username', res.user.username);
        const authString = 'Basic ' + btoa(this.userRequest.username + ':' + this.userRequest.password);
        sessionStorage.setItem('basicauth', authString);
        sessionStorage.setItem('role', res.user.role);
        sessionStorage.setItem('id', res.user.id.toString());
        console.log(res);
        this.invalidLogin = false;
        this.message = '';
        this.router.navigate(['/']);
      }
    });
  }

}
