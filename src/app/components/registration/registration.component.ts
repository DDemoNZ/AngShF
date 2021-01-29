import {Component, OnInit} from '@angular/core';
import {AuthServiceComponent} from '../../service/auth-service/auth-service.component';
import {ActivatedRoute, Router} from '@angular/router';
import {UserRequest} from '../../models/userRequest';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

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

  registration(): void {
    console.log(this.userRequest);
    this.authService.registration(this.userRequest).subscribe(
      res => {
        this.userRegForm.reset();
        this.router.navigate(['/']);
      },
      error => {
        if (error.status >= 200 && error.status < 300) {
          this.userRegForm.reset();
          this.router.navigate(['/login']);
        } else {
          this.message = error.error;
        }
      });
  }

}
