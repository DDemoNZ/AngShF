import {ErrorHandler, Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {

  constructor(private router: Router) {
  }

  handleError(error: any): void {
    if (error.status === 401) {
      this.router.navigate(['/login'], {state: {errorMsg: error.message}});
    } else if (error === 'Username is already taken.') {
    } else {
      // this.router.navigate(['/error']);
    }
  }

}
