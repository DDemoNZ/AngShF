import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthServiceComponent} from './auth-service.component';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthServiceComponent,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot
  ): Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean | UrlTree {

    return this.authService.isAuthenticated() ?
      true : this.router.navigate(['/login'], {
        queryParams: {
          auth: false
        }
      });
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot
  ): Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean | UrlTree {

    return this.canActivate(childRoute, state);
  }

}
