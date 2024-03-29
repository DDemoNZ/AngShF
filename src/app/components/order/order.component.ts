import {Component, Injectable, Input, OnInit} from '@angular/core';
import {ItemModel} from '../../models/ItemModel';
import {AuthServiceComponent} from '../../service/auth-service/auth-service.component';
import {OrderRequest} from '../../models/OrderRequest';
import {User} from '../../models/user';
import {Observable} from 'rxjs';
import {BucketComponent} from '../bucket/bucket.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class OrderComponent implements OnInit {


  private price: number;

  constructor(private http: AuthServiceComponent) {
  }

  ngOnInit(): void {
  }

  confirmBucketToOrder(itemsSB: ItemModel[]): any {

    console.log('confirm order  ' + itemsSB);

    itemsSB.forEach(items => this.price += items.price);
    const order: OrderRequest = {
      // user: User;
      // orderItems: ItemModel[] = [];
      // price: number;
      userId: sessionStorage.getItem('id'),
      orderItems: itemsSB,
      price: this.price
    };
    this.http.completeOrder(order).then(function(orders) {
      console.log('promise ---- ' + orders);
    });

    // .subscribe(
    // res => {
    //   console.log('return res void' + res.items);
    //   const newVar: ItemModel[] = [];
    //   return newVar;
    // },
    // error => {
    //   alert('Something went wrong! ' + error.toString());
    //   const itemModels: ItemModel[] = itemsSB;
    //   return itemModels;
    // });
    // }
  }
}
