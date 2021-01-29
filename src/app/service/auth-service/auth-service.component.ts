import {Injectable, OnInit} from '@angular/core';
import {UserRequest} from '../../models/userRequest';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/user';
import {Observable} from 'rxjs';
import {AuthResponse} from '../../models/authResponse';
import {ItemRequest} from '../../models/itemRequest';
import {ItemResponse} from '../../models/itemResponse';
import {Orders} from '../../models/orders';
import {OrderRequest} from '../../models/OrderRequest';
import {ItemPageModel} from '../../models/ItemPageModel';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceComponent implements OnInit {

  user: User;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  setUser(user: User): void {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }

  getToken(): string {
    return sessionStorage.getItem('generatedJwtToken');
  }

  authenticate(user: UserRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('http://localhost:9090/auth/login', user);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null;
  }

  registration(user: UserRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('http://localhost:9090/auth/registration', user);
  }

  postItem(item: ItemRequest): Observable<ItemResponse> {
    return this.http.post<ItemResponse>('http://localhost:9090/item/post', item);
  }

  getAllItem(currentPage: number, itemsOnPage: number): Observable<ItemPageModel> {
    const body = {
      page: currentPage,
      size: itemsOnPage
    };
    const http = this.http.get<ItemPageModel>('http://localhost:9090/item?page=' + currentPage + '&size=' + itemsOnPage);
    http.subscribe(res => console.log(res));
    return http;
  }

  getOrders(id: number): Observable<Orders[]> {
    console.log('id get orders ' + id);
    return this.http.get<Orders[]>('http://localhost:9090/orders/' + id);
  }

  logOut(): void {
    console.log('Logout ' + sessionStorage.getItem('username'));
    sessionStorage.clear();
  }

  completeOrder(order: OrderRequest): Promise<Orders> {
    return this.http.post<Orders>('http://localhost:9090/orders', order).toPromise();
  }
}
