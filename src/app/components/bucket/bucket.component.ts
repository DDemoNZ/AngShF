import {Component, Injectable, OnInit} from '@angular/core';
import {ItemModel} from '../../models/ItemModel';
import {OrderComponent} from '../order/order.component';
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
    this.itemsOp.addItemToBucket(item);
  }

  confirmBucketToOrder(): void {
    if (sessionStorage.getItem('id') === null) {
    } else {
      this.order.confirmBucketToOrder(this.itemsOp.getItemsFromBucket());
      this.itemsInBucket = [];
      this.itemsOp.clearBucket();
      this.itemsInBucket.length === 0 ? alert('Success') : alert('Unsuccessful. Try again.');
    }
  }

  delete(item: ItemModel): void {
    this.itemsOp.deleteItem(item);
  }
}
