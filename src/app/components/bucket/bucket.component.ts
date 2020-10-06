import {Component, Injectable, Input, OnInit, Output} from '@angular/core';
import {ItemModel} from '../../models/ItemModel';
import {OrderComponent} from '../order/order.component';
import {ShopComponent} from '../shop/shop.component';
import {ItemsOperations} from '../../service/itemsOperations';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class BucketComponent implements OnInit {

  itemsInBucket: ItemModel[] = [];

  constructor(private order: OrderComponent,
              private itemsOp: ItemsOperations) {
    this.itemsInBucket = itemsOp.getItemsFromBucket();
  }

  ngOnInit(): void {
  }


  addBucket(item: ItemModel): void {
    // this.itemsSB.push(item);
    this.itemsOp.addItemToBucket(item);
  }

  confirmBucketToOrder(): void {
    if (sessionStorage.getItem('id') === null) {
      alert('LogIn');
    } else {
      const itemModels: ItemModel[] = this.order.confirmBucketToOrder(this.itemsOp.getItemsFromBucket());
      console.log('order result ' + itemModels);

      this.itemsInBucket = [];
      this.itemsOp.clearBucket();
      this.itemsInBucket.length === 0 ? alert('Success') : alert('Unsuccessful. Try again.');
    }
  }

  delete(item: ItemModel) {
    // console.log('Delete item ' + item.id + '     ' + this.itemsSB.indexOf(item));
    // this.itemsOp.deleteItem(this.itemsInBucket.indexOf(item) + 1);
    this.itemsOp.deleteItem(item);
    // console.log('list ' + this.itemsSB);
  }
}
