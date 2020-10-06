import {Component, OnInit} from '@angular/core';
import {ItemModel} from '../../models/ItemModel';
import {AuthServiceComponent} from '../../service/auth-service/auth-service.component';
import {BucketComponent} from '../bucket/bucket.component';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {

  itemsOnPageList: ItemModel[] = [];
  errorMessage: string;
  currentPage = 0;
  itemsOnPage = 20;

  public itemsInBucket: ItemModel[] = [];

  // constructor(private http: AuthServiceComponent,
  //             private bucket: BucketComponent) {
  // }

  // ngOnInit(): void {
  //   this.getItems(this.currentPage, this.itemsOnPage);
  // }

  constructor(private http: AuthServiceComponent,
              private bucket: BucketComponent) {
    this.getItems(this.currentPage, this.itemsOnPage);
  }

  getItems(currentPage: number, itemsOnPage: number): void {
    console.log('Page ' + currentPage + '  items on page ' + itemsOnPage);
    // this.http.getAllItem(currentPage, itemsOnPage).subscribe(res => {
    //   if (res.message !== null) {
    //     this.errorMessage = res.message;
    //     console.log('Error ' + this.errorMessage);
    //   } else {
    //     this.itemsOnPageList = res.items;
    //     console.log('Get all items ' + this.itemsOnPageList.entries() + ' .');
    //   }
    // });
    this.http.getAllItem(currentPage, itemsOnPage).subscribe(res => {
        this.itemsOnPageList = res;
      },
      error => {
        this.errorMessage = error.toString();
      });
  }

  addItemToSB(item: ItemModel): void {
    // this.itemsSB.push(item);
    console.log('items - ' + this.itemsInBucket.forEach(console.log));
    this.bucket.addBucket(item);
    // this.itemsInBucket.push(item);
  }

  checkUser(): boolean {
    return sessionStorage.getItem('username') == null;
  }
}
