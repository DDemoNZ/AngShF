import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthServiceComponent} from './auth-service.component';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthServiceComponent) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.getToken() !== null) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getToken()}`
        }
      });

      return next.handle(req);
    } else {
      return next.handle(req);
    }
  }
}
