import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {AuthServiceComponent} from '../../service/auth-service/auth-service.component';
import {Orders} from '../../models/orders';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // getProfile() {
  showOrdersCheck = true;
  orders: Orders[] = [];

  user: User = {
    id: +sessionStorage.getItem('id'),
    role: sessionStorage.getItem('role'),
    username: sessionStorage.getItem('username')
  };


  ngOnInit(): void {
    // this.showOrders();
  }

  constructor(private http: AuthServiceComponent) {
  }

  //
  // }
  showOrders(): void {
    console.log('user if profile ' + this.user.username + ' ' + this.showOrdersCheck);
    if (this.showOrdersCheck === false) {
      this.showOrdersCheck = !this.showOrdersCheck;
      this.http.getOrders(this.user.id).subscribe(res => {
        console.log('result of get orders' + res);
        this.orders = res;
        },
        error => alert(error.toString()));
    } else {
      // this.showOrdersCheck = !this.showOrdersCheck;
      console.log('TYT');
      this.http.getOrders(this.user.id).subscribe(res => {
          console.log('result of get orders' + res);

          this.orders = res;
      },
        error => alert(error.toString()));
    }
  }

}
