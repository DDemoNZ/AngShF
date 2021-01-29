import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';

export class MyValidators {

  static restrictedEmails(control: FormControl): { [key: string]: boolean } {
    if (['test@m.c', 'adm@m.c'].includes(control.value)) {
      return {
        restrictedEmail: true
      };
    }
    return null;
  }

  // Async validator (call server)
  static uniqEmail(control: FormControl): Promise<any> | Observable<any> {
    return new Promise(resolve => {
      setTimeout(() => {
        if (control.value === 'async@mail.ru') {
          resolve({uniqEmail: true});
        } else {
          resolve(null);
        }
      }, 1000);
    });
  }

}
