import {Component, Injectable, OnInit} from '@angular/core';
import {UserRequest} from '../../models/userRequest';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../../models/user';
import {Observable} from 'rxjs';
import {logger} from 'codelyzer/util/logger';
import {AuthResponse} from '../../models/authResponse';
import {ItemRequest} from '../../models/itemRequest';
import {ItemResponse} from '../../models/itemResponse';
import {ItemModel} from '../../models/ItemModel';
import {Orders} from '../../models/orders';
import {OrderRequest} from '../../models/OrderRequest';
import {catchError, map} from 'rxjs/operators';

// @Component({
//   selector: 'app-auth-service',
//   templateUrl: './auth-service.component.html',
//   styleUrls: ['./auth-service.component.css'],
// })
@Injectable({
  providedIn: 'root'
})
export class AuthServiceComponent implements OnInit {

  user: User;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  setUser(user: User): void {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }

  authenticate(user: UserRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('http://localhost:9090/auth/log', user);
  }

  registration(user: UserRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('http://localhost:9090/auth/reg', user);
  }

  postItem(item: ItemRequest): Observable<ItemResponse> {
    return this.http.post<ItemResponse>('http://localhost:9090/item/post', item);
  }

  getAllItem(currentPage: number, itemsOnPage: number): Observable<ItemModel[]> {
    // console.log('getItems');
    const body = {
      page: currentPage,
      size: itemsOnPage
    };
    const http = this.http.get<ItemModel[]>('http://localhost:9090/item?page=' + currentPage + '&size=' + itemsOnPage);
    http.subscribe(res => console.log(res));
    return http;
  }

  getOrders(id: number): Observable<Orders[]> {
    console.log('id get orders ' + id);
    return this.http.get<Orders[]>('http://localhost:9090/orders/'  + id);
  }

  logOut(): void {
    console.log('Logout ' + sessionStorage.getItem('username'));
    sessionStorage.clear();
  }

  completeOrder(order: OrderRequest): Promise<Orders> {
    return this.http.post<Orders>('http://localhost:9090/orders', order).toPromise();
  }

  // private handleError(error: Response | any) {
  //   let errMsg: string;
  //   console.log('Error catch ' + error);
  //   if (errMsg instanceof Response) {
  //     const err = error || '';
  //     errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  //   } else {
  //     errMsg = error.message ? error.message : error.toString();
  //   }
  //   return Observable.throw(errMsg);
  // }

}
