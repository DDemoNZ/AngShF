import {Injectable} from '@angular/core';
import {ItemModel} from '../models/ItemModel';

@Injectable({
  providedIn: 'root'
})
export class ItemsOperations {

  itemsInBucket: ItemModel[] = [];

  addItemToBucket(item: ItemModel) {
    this.itemsInBucket.push(item);
  }

  getItemsFromBucket() {
    return this.itemsInBucket;
  }

  deleteItem(item: ItemModel) {
    const id = this.itemsInBucket.indexOf(item);
    this.itemsInBucket.splice(id, 1);
  }

  clearBucket() {
    console.log(this.itemsInBucket + '    items in bucket');
    this.itemsInBucket = [];
  }
}
